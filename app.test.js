const request = require('supertest');
const { response } = require('./app');
const app = require('./app');

describe('Todos API', () => {
  it('GET /todos --> array of todos', () => {
    return request(app)
      .get('/todos')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it('GET /todos/:id --> specific todo by id', () => {
    return request(app)
      .get('/todos/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it('GET /todos/:id --> 404 if not found', () => {
    return request(app)
      .get('/todos/9999')
      .expect('Content-Type', /json/)
      .expect(404)
      .then((response) => {
        // generator returns an html page
      });
  });

  it('POST /todos --> newly created todo', () => {
    return request(app)
      .post('/todos')
      .send({
        name: 'do dishes',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect.objectContaining({
          name: 'do dishes',
          completed: false,
        });
      });
  });

  it('POST /todos --> validates request body', () => {
    return request(app)
      .post('/todos')
      .send({
        name: 123,
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .then((response) => {
        //
      });
  });
});
