import sign from '../src/sign';

describe('sign', ()=>{
  it('should produce different signatures', ()=> {
    const secret = '123';
    const jwtOne = sign({
      payload: {
        name: 'rodrigo'
      },
      secret,
      options: {
        expiresIn: 8.6e7
      }
    }).split('.')[2];
    const jwtTwo = sign({
      payload: {
        name: 'rodrigo'
      },
      secret: `${secret}-13323`,
      options: {
        expiresIn: 8.6e7
      }
    }).split('.')[2];
    expect(jwtOne).not.toBe(jwtTwo);
  })
  it('should add the expiry to the payload', () => {
    const secret = '123';
    const jwtOne = sign({
      payload: {
        name: 'rodrigo'
      },
      secret,
      options: {
        expiresIn: 8.6e7
      }
    }).split('.')[1];
    expect(typeof JSON.parse(atob(jwtOne)).exp).toBe('number');
  })
});