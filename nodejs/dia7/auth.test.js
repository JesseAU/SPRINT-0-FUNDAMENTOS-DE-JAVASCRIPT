process.env.NODE_ENV = 'test';
// test/auth.test.js
const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

after(() => {
    mongoose.connection.close();
});

describe('Autenticación', () => {

    describe('POST /auth/login', () => {

        test('login con credenciales incorrectas devuelve 401', async (t) => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'noexiste@restaurante.com',
                    password: 'claveIncorrecta'
                });

            assert.strictEqual(response.status, 401);
        });

        test('login sin body devuelve error', async (t) => {
            const response = await request(app)
                .post('/auth/login')
                .send({});
            
            assert.ok(response.status >= 400);
        });

    });

    describe('Rutas protegidas', () => {

        test('POST /menu sin token devuelve 401', async (t) => {
            const response = await request(app)
                .post('/menu')
                .send({ nombre: 'Test', precio: 10 });
            
            assert.strictEqual(response.status, 401);
        });

        test('GET /menu sin token devuelve 200 (ruta libre)', async (t) => {
            const response = await request(app).get('/menu');
            assert.strictEqual(response.status, 200);
        });

    });

});
