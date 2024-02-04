import request from 'supertest';
import app from '../../Back/index.js';

describe('GET /pokemon/:name', () => {
    test('returns Pokemon details', async () => {
        //Sends GET request to endpoing "/pokemon/charizard"
        const response = await request(app).get('/pokemon/charizard');

        //Expects 200 HTTP status code response and response body to be object with:
        // "name" - charizard
        // "description" - a non - empty string
        // "is_legendary" - a boolean
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            name: 'charizard',
            description: expect.any(String),
            is_legendary: expect.any(Boolean),
        });
    });
});