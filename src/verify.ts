import decode from './decode';
import { createSignature } from './sign';

export interface VerifyInput {
  token: string,
  secret: string
}
const dateInPast = ({exp}: {exp: number}) => {
  const currentDate = new Date();
  return new Date(exp).setHours(0, 0, 0, 0) <= currentDate.setHours(0, 0, 0, 0);
}

const verify = ({token, secret}: VerifyInput) => {
  const parts = token.split('.');
  if(parts.length !== 3){
    throw new Error('Invalid Token');
  }
  const [encodedHeader, encodedPayload, signature] = parts;
  const candidateSignature = createSignature({encodedHeader, encodedPayload, secret});
  if(signature !== candidateSignature) {
    throw new Error('Invalid token');
  }
  const decoded = decode({token});
  const { exp } = decoded;
  //check 
  if(dateInPast({exp})){
    throw new Error('Token has expired');
  }
  return decoded;
}

export default verify;