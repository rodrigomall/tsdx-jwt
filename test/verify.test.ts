import sign from '../src/sign';
import verify from '../src/verify';

describe('verify', ()=> {
  it('should verify and decode a valid token', ()=> {
    const secret = '123';
    const token = sign({payload: {name: 'rodrigo'}, secret});
    const verified = verify({token, secret});
    expect(verified.name).toBe('rodrigo');
  });

  it('should throw if the signature is invalid', ()=> {
    const secretTwo = 'secretTwo';
    const token = sign({payload: {name: 'rodrigo'}, secret: secretTwo });
    try {
      verify({token, secret: secretTwo });
    } catch (e) {
      expect(e.message).toBe('Invalid signature');
    }
  });

  it('should throw if the token has expired', ()=> {
    const secret = '123';
    const token = sign({
      payload: { name: 'rodrigo'},
      secret,
      options: {
        expiresIn: -8.64e7
      }
    });
    try {
      verify({token, secret });
    } catch (e) {
      expect(e.message).toBe('Token has expired');
    }
  });
});