import {
  app, db, saveComent, getComent, onGetComents, deleteComent, getPost, updatePost,
} from '../src/lib/Firebase.js';

// app
describe('app()', () => {
  it('debe ejecutar el metodo initializeApp', () => {
    const config = {};

    expect(app(config)).resolves.toBeUndefined;
  });
});
