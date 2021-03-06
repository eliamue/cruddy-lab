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

    const redvelvet = await Maknaes.createMaknae({
      kgroup: 'Red Velvet',
      stage_name: 'Joy',
      real_name: 'Park Soo-young'
    });

    const res = await request(app)
      .get('/api/v1/maknaes');
    expect(res.body).toEqual([bts, mamamoo, shinee, gidle, exo, redvelvet]);
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

  it('updates the maknae', async () => {
    const redvelvet = await Maknaes.createMaknae({
      kgroup: 'Red Velvet',
      stage_name: 'Joy',
      real_name: 'Park Soo-young'
    });
    const res = await request(app)
      .put(`/api/v1/maknaes/${redvelvet.id}`)
      .send({
        stage_name: 'Yeri',
        real_name: 'Kim Ye-rim'
      });
    expect(res.body).toEqual({
      ...redvelvet,
      stage_name: 'Yeri',
      real_name: 'Kim Ye-rim'
    });
  });

  it('deletes a specific existing maknae', async () => {
    const maknae = await Maknaes.createMaknae({
      kgroup: '(G)I-dle',
      stage_name: 'Shuhua',
      real_name: 'Yeh Shuhua'
    });
    const res = await request(app)
      .delete(`/api/v1/maknaes/${maknae.id}`);

    expect(res.body).toEqual({
      message: `${maknae.stage_name} has been deleted. Rude.`
    });
  });
});
