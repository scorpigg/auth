import { IUserDto } from '../dtos/user-dto';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import jwt from 'jsonwebtoken';
import { db } from '../firebase';

const tokensRef = collection(db, 'tokens');

class TokenService {

  public generateTokens(payload: IUserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveToken(userId: string, refreshToken: string) {
    const docRef = doc(tokensRef, userId);
    const tokenData = (await getDoc(docRef)).data();

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await updateDoc(docRef, tokenData);
    }

    const token = await addDoc(tokensRef, { user: userId, refreshToken });
    return token;
  }

}

export default new TokenService();