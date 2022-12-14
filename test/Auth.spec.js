/**
 * @jest-environment jsdom
 */

import { Register } from '../src/components/Register.js';

jest.mock('../src/main.js');

describe('Test de registro', () => {
  test('el componente es una funcion', () => {
    expect(typeof Register).toBe('function');
  });
});
