import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Dancers from '../lib/models/Dancers';

describe('dancers routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new dancer', async () => {
    const twice = {
      kgroup: 'Twice',
      name: 'Momo'
    };
    const res = await request(app)
      .post('/api/v1/dancers')
      .send(twice);

    expect(res.body).toEqual({
      id: '1',
      ...twice
    });
  });

  
});
