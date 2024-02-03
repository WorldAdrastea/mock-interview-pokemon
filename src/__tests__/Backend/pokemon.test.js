import request from 'supertest';
import app from '../../Back/index.js';

describe('GET /pokemon/:name', () => {
    test('returns Pokemon details', async () => {
        const response = await request(app).get('/pokemon/charizard');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            name: 'charizard',
            description: expect.any(String),
            is_legendary: expect.any(Boolean),
        });
    });
});