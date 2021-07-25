import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Leaders from '../lib/models/Leaders';


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

  it('gets all leaders', async () => {
    const bts = await Leaders.createLeader({
      kgroup: 'BTS',
      stage_name: 'RM',
      real_name: 'Kim Nam-joon'
    });

    const mamamoo = await Leaders.createLeader({
      kgroup: 'Mamamoo',
      stage_name: 'Solar',
      real_name: 'Kim Yong-sun'
    });

    const ateez = await Leaders.createLeader({
      kgroup: 'Ateez',
      stage_name: 'Hongjoong',
      real_name: 'Kim Hong-joong'
    });

    const twice = await Leaders.createLeader({
      kgroup: 'Twice',
      stage_name: 'Jihyo',
      real_name: 'Park Ji-soo'
    });

    const monstax = await Leaders.createLeader({
      kgroup: 'Monsta X',
      stage_name: 'Shownu',
      real_name: 'Sohn Hyun-woo'
    });

    const itzy = await Leaders.createLeader({
      kgroup: 'Itzy',
      stage_name: 'Yeji',
      real_name: 'Hwang Ye-ji'
    });

    const res = await request(app)
      .get('/api/v1/leaders');
    expect(res.body).toEqual([bts, mamamoo, ateez, twice, monstax, itzy]);
  });

  it('gets one leader by id', async () => {
    const itzy = await Leaders.createLeader({
      kgroup: 'Itzy',
      stage_name: 'Yeji',
      real_name: 'Hwang Ye-ji'
    });
    const res = await request(app)
      .get(`/api/v1/leaders/${itzy.id}`);

    expect(res.body).toEqual(itzy);
  });
});
