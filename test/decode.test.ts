import decode from '../src/decode';
import sign from '../src/sign';

describe('decode', ()=>{
  it('should decode the token payload', ()=> {
    const token = sign({payload: {name: 'rodrigo'}, secret: '123'});
    const decoded = decode({token})
    expect(decoded.name).toBe('rodrigo');
  });
});