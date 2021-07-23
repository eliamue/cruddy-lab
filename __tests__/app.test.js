import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('rappers routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new rapper', async () => {
    const rapper = { group: 'Ateez', name: 'Hongjoong' };
    const res = await request(app)
      .post('/api/v1/rappers')
      .send(rapper);

    expect(res.body).toEqual({
      id: '1',
      ...rapper
    });
  });
});
