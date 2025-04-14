// utils/encrypt.ts
import forge from 'node-forge';

export const rsaEncrypt = (data: object): string => {
  try {
    const publicKeyPem = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY?.replace(
      /\\n/g,
      '\n',
    );
    if (!publicKeyPem) {
      throw new Error('RSA 공개키가 설정되지 않았습니다');
    }

    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

    const jsonString = JSON.stringify(data);

    const encrypted = publicKey.encrypt(jsonString, 'RSA-OAEP');

    return forge.util.encode64(encrypted);
  } catch (error) {
    throw new Error('RSA 암호화 실패: ' + error);
  }
};
