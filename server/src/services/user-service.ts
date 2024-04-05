import { db } from '../firebase';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import mailService from './mail-service';
import tokenService from './token-service';
import { UserDto } from '../dtos/user-dto';
import { ApiError } from '../exceptions/api-error';

const usersRef = collection(db, 'users');

class UserService {

  public async registration(email: string, password: string) {
    const candidates = query(usersRef, where('email', '==', email));
    const candidate = (await getDocs(candidates)).docs.length;

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const userId = (await addDoc(usersRef, { email, password: hashPassword, activationLink, isActivated: false })).id;
    const userRef = doc(usersRef, userId);
    const user = (await getDoc(userRef)).data();
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    const userDto = new UserDto({ email: user.email, id: userId, isActivated: user.isActivated });
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  public async activate(activationLink: string) {
    const users = query(usersRef, where('activationLink', '==', activationLink));
    const userId = (await getDocs(users)).docs[0].id;

    if (!userId) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    const docRef = doc(usersRef, userId);
    await updateDoc(docRef, { isActivated: true });
  }

  public async login(email: string, password: string) {
    const users = query(usersRef, where('email', '==', email));
    const userRef = (await getDocs(users)).docs[0];

    if (!userRef) {
      throw ApiError.BadRequest('Пользователь не был найден');
    }

    const user = userRef.data();
    const userId = userRef.id;

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto({ email: user.email, id: userId, isActivated: user.isActivated });
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  public async loguot(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

}

export default new UserService();