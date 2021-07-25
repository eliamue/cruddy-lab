import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';


describe('group leaders CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new group leader', async () => {
    const mamamoo = {
      kgroup: 'Mamamoo',
      stage_name: 'Solar',
      real_name: 'Kim Yong-sun'
    };
    const res = await request(app)
      .post('/api/v1/leaders')
      .send(mamamoo);

    expect(res.body).toEqual({
      id: '1',
      ...mamamoo
    });
  });

});
