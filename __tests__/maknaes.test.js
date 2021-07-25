import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Maknaes from '../lib/models/Maknaes';

describe('maknaes CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new maknae', async () => {
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

  it('gets all maknaes', async () => {
    const bts = await Maknaes.createMaknae({
      kgroup: 'BTS',
      stage_name: 'Jungkook',
      real_name: 'Jeon Jung-kook'
    });

    const mamamoo = await Maknaes.createMaknae({
      kgroup: 'Mamamoo',
      stage_name: 'Hwasa',
      real_name: 'Ahn Hye-jin'
    });

    const shinee = await Maknaes.createMaknae({
      kgroup: 'SHINee', 
      stage_name: 'Taemin',
      real_name: 'Lee Tae-min'
    });

    const gidle = await Maknaes.createMaknae({
      kgroup: '(G)I-dle',
      stage_name: 'Shuhua',
      real_name: 'Yeh Shuhua'
    });

    const exo = await Maknaes.createMaknae({
      kgroup: 'EXO',
      stage_name: 'Sehun',
      real_name: 'Oh Se-hun'
    });

    const itzy = await Maknaes.createMaknae({
      kgroup: 'Itzy',
      stage_name: 'Yuna',
      real_name: 'Shin Yu-na'
    });

    const res = await request(app)
      .get('/api/v1/maknaes');
    expect(res.body).toEqual([bts, mamamoo, shinee, gidle, exo, itzy]);
  });

  it('gets one maknae by id', async () => {
    const itzy = await Maknaes.createMaknae({
      kgroup: 'Itzy',
      stage_name: 'Yuna',
      real_name: 'Shin Yu-na'
    });
    const res = await request(app)
      .get(`/api/v1/maknaes/${itzy.id}`);

    expect(res.body).toEqual(itzy);
  });
});
