process.env.NODE_ENV = 'test';
// test/menu.test.js
const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

after(() => {
    mongoose.connection.close();
});

describe('Rutas del menú', () => {

    test('GET /menu devuelve 200 y un array', async (t) => {
        const response = await request(app).get('/menu');
        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(response.body));
    });

    test('GET /menu/buscar sin ?nombre= devuelve 400', async (t) => {
        const response = await request(app).get('/menu/buscar');
        assert.strictEqual(response.status, 400);
    });

    test('GET /menu/:id con id inválido devuelve 500', async (t) => {
        const response = await request(app).get('/menu/id-que-no-existe');
        assert.strictEqual(response.status, 500);
    });

    test('GET /menu/categoria/:cat con categoría válida devuelve 200 y array', async (t) => {
        const response = await request(app).get('/menu/categoria/Segundos');
        assert.strictEqual(response.status, 200);
        assert.ok(Array.isArray(response.body));
    });

    test('GET /menu/categoria/:cat con categoría inexistente devuelve array vacío', async (t) => {
        const response = await request(app).get('/menu/categoria/NoExiste');
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.body.length, 0);
    });

});
