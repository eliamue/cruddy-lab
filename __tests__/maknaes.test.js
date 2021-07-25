import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Maknaes from '../lib/models/Maknaes';


describe('group maknaes CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new group maknae', async () => {
    const bts = {
      kgroup: 'BTS',
      stage_name: 'Jungkook',
      real_name: 'Jeon Jung-kook'
    };
    const res = await request(app)
      .post('/api/v1/maknaes')
      .send(bts);

    expect(res.body).toEqual({
      id: '1',
      ...bts
    });
});
