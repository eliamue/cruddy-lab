import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Vocalists from '../lib/models/Vocalists';

describe('vocalists routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new vocalist', async () => {
    const gIdle = {
      kgroup: '(G)I-dle',
      name: 'Minnie'
    };
    const res = await request(app)
      .post('/api/v1/vocalists')
      .send(gIdle);

    expect(res.body).toEqual({
      id: '1',
      ...gIdle
    });
  });

});
