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
      name: 'Hyunjin' 
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
      name: 'Hyunjin'
    });

    const mamamoo = await Rappers.createRapper({
      kgroup: 'Mamamoo', 
      name: 'Moonbyul'
    });

    const bts = await Rappers.createRapper(
      {
        kgroup: 'BTS', 
        name: 'Suga'
      });

    const shinee = await Rappers.createRapper(
      {
        kgroup: 'SHINee', 
        name: 'Minho'
      });
    const ateez = await Rappers.createRapper(
      {
        kgroup: 'Ateez', 
        name: 'Hongjoong'
      });

    const res = await request(app)
      .get('/api/v1/rappers');

    expect(res.body).toEqual([strayKids, mamamoo, bts, shinee, ateez]);
  });

  it('gets one rapper by id', async () => {
    const ateez = await Rappers.createRapper({
      kgroup: 'Ateez',
      name: 'Hongjoong'
    });
    const res = await request(app)
      .get(`/api/v1/rappers/${ateez.id}`);

    expect(res.body).toEqual(ateez);
  });

  it('updates the rapper of a specific existing group', async () => {
    const bts = await Rappers.createRapper({
      kgroup: 'BTS',
      name: 'J-Hope'
    });
    const res = await request(app)
      .put(`/api/v1/rappers/${bts.id}`)
      .send({
        name: 'J-Hope'
      });
    expect(res.body).toEqual({ 
      ...bts, 
      name: 'J-Hope' 
    });
  });

  it('deletes a specific existing rapper', async () => {
    const rapper = await Rappers.createRapper({
      kgroup: 'Ateez',
      name: 'Hongjoong'
    });
    const res = await request(app)
      .delete(`/api/v1/rappers/${rapper.id}`);

    expect(res.body).toEqual({
      message: `${rapper.name} has been removed. Poor ${rapper.name}!`
    });
  });
});
