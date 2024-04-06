import { IUserDto } from '../dtos/user-dto';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import jwt, { JwtPayload } from 'jsonwebtoken';
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
    const tokens = query(tokensRef, where('user', '==', userId));
    const tokenRef = (await getDocs(tokens)).docs[0];

    if (tokenRef) {
      const tokenData = tokenRef.data();
      const tokenId = tokenRef.id;
      tokenData.refreshToken = refreshToken;
      const token = doc(tokensRef, tokenId);
      return await updateDoc(token, tokenData);
    }

    const token = await addDoc(tokensRef, { user: userId, refreshToken });
    return token;
  }

  public async removeToken(refreshToken: string) {
    const tokens = query(tokensRef, where('refreshToken', '==', refreshToken));
    const tokenRef = (await getDocs(tokens)).docs[0];
    const tokenData = tokenRef.data();
    const tokenId = tokenRef.id;
    await deleteDoc(doc(tokensRef, tokenId));
    return tokenData;
  }

  public validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;
      return userData;
    } catch (e) {
      return null;
    }
  }

  public validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload;
      return userData;
    } catch (e) {
      return null;
    }
  }

  public async findToken(refreshToken: string) {
    const tokens = query(tokensRef, where('refreshToken', '==', refreshToken));
    const tokenData = (await getDocs(tokens)).docs[0].data();
    return tokenData;
  }

}

export default new TokenService();