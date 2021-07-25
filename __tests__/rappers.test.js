import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Rappers from '../lib/models/Rappers';

describe('rappers routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new rapper', async () => {
    const strayKids = { 
      kgroup: 'Stray Kids', 
      stage_name: 'Hyunjin',
      real_name: 'Hwang Hyun-jin' 
    };
    const res = await request(app)
      .post('/api/v1/rappers')
      .send(strayKids);

    expect(res.body).toEqual({
      id: '1',
      ...strayKids
    });
  });
  
  it('gets all rappers', async () => {
    const strayKids = await Rappers.createRapper({
      kgroup: 'Stray Kids', 
      stage_name: 'Han',
      real_name: 'Han Ji-sung' 
    });

    const mamamoo = await Rappers.createRapper({
      kgroup: 'Mamamoo', 
      stage_name: 'Moonbyul',
      real_name: 'Moon Byul-yi' 
    });

    const bts = await Rappers.createRapper(
      {
        kgroup: 'BTS', 
        stage_name: 'Suga',
        real_name: 'Min Yoon-gi' 
      });

    const shinee = await Rappers.createRapper(
      {
        kgroup: 'SHINee', 
        stage_name: 'Minho',
        real_name: 'Choi Min-ho' 
      });
    const ateez = await Rappers.createRapper(
      {
        kgroup: 'Ateez', 
        stage_name: 'Hongjoong',
        real_name: 'Kim Hong-joong' 
      });

    const gidle = await Rappers.createRapper(
      {
        kgroup: '(G)I-dle', 
        stage_name: 'Soyeon',
        real_name: 'Jeon So-yeon' 
      });

    const res = await request(app)
      .get('/api/v1/rappers');

    expect(res.body).toEqual([strayKids, mamamoo, bts, shinee, ateez, gidle]);
  });

  it('gets one rapper by id', async () => {
    const ateez = await Rappers.createRapper({
      kgroup: 'Ateez',
      stage_name: 'Hongjoong',
      real_name: 'Kim Hong-joong' 
    });
    const res = await request(app)
      .get(`/api/v1/rappers/${ateez.id}`);

    expect(res.body).toEqual(ateez);
  });

  it('updates the rapper of a specific existing group', async () => {
    const bts = await Rappers.createRapper({
      kgroup: 'BTS',
      stage_name: 'J-Hope',
      real_name: 'Jung Ho-seok' 
    });
    const res = await request(app)
      .put(`/api/v1/rappers/${bts.id}`)
      .send({
        stage_name: 'J-Hope',
        real_name: 'Jung Ho-seok' 
      });
    expect(res.body).toEqual({ 
      ...bts, 
      stage_name: 'J-Hope',
      real_name: 'Jung Ho-seok'  
    });
  });

  it('deletes a specific existing rapper', async () => {
    const rapper = await Rappers.createRapper({
      kgroup: 'Ateez',
      stage_name: 'Hongjoong',
      real_name: 'Kim Hong-joong' 
    });
    const res = await request(app)
      .delete(`/api/v1/rappers/${rapper.id}`);

    expect(res.body).toEqual({
      message: `${rapper.stage_name} has been removed. Poor ${rapper.stage_name}!`
    });
  });
});
