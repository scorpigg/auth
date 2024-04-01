import { db } from '../firebase';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import mailService from './mail-service';
import tokenService from './token-service';
import { UserDto } from '../dtos/user-dto';

const usersRef = collection(db, 'users');

class UserService {

  public async registration(email: string, password: string) {
    const candidates = query(usersRef, where('email', '==', email));
    const candidate = (await getDocs(candidates)).docs.length;

    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
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

}

export default new UserService();