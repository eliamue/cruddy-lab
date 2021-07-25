import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Visuals from '../lib/models/Visuals';

describe('visuals routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new visual for a group', async () => {
    const bts = {
      kgroup: 'BTS',
      stage_name: 'Jin',
      real_name: 'Kim Seok-jin'
    };
    const res = await request(app)
      .post('/api/v1/visuals')
      .send(bts);

    expect(res.body).toEqual({
      id: '1',
      ...bts
    });
  });

  
});
