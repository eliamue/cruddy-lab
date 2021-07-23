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
    const rapper = { 
      kgroup: 'Stray Kids', 
      name: 'Hyunjin' 
    };
    const res = await request(app)
      .post('/api/v1/rappers')
      .send(rapper);

    expect(res.body).toEqual({
      id: '1',
      ...rapper
    });
  });
  
  it('gets all rappers', async () => {
    const hyunjin = await Rappers.createRapper({
      kgroup: 'Stray Kids', 
      name: 'Hyunjin'
    });

    const moonbyul = await Rappers.createRapper({
      kgroup: 'Mamamoo', 
      name: 'Moonbyul'
    });

    const suga = await Rappers.createRapper(
      {
        kgroup: 'BTS', 
        name: 'Suga'
      });

    const minho = await Rappers.createRapper(
      {
        kgroup: 'SHINee', 
        name: 'Minho'
      });

    const res = await request(app)
      .get('/api/v1/rappers');

    expect(res.body).toEqual([hyunjin, moonbyul, suga, minho]);
  });
});
