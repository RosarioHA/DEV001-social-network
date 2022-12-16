/**
 * @jest-environment jsdom
 */
import { signInGoogle } from '../src/lib/Auth.js';

jest.mock('firebase/auth');

describe('signInGoogle()', () => {
  it('debe ejecutar el método signInWithPopup', async () => {
    const callback = jest.fn();
    await signInGoogle(callback);
    expect(callback).toHaveBeenCalled();
  });
});
