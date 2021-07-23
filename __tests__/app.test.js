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
    const rapper = { kgroup: 'Stray Kids', name: 'Hyunjin' };
    const res = await request(app)
      .post('/api/v1/rappers')
      .send(rapper);

    expect(res.body).toEqual({
      id: '1',
      ...rapper
    });
  });
  
  it('gets all rappers', async () => {
    const allRappers = await Rappers.insert(
      [
        {
          kgroup: 'Stray Kids', 
          name: 'Hyunjin'
        },
        {
          kgroup: 'Mamamoo', 
          name: 'Moonbyul'
        },
        {
          kgroup: 'BTS', 
          name: 'Suga'
        },
        {
          kgroup: 'SHINee', 
          name: 'Minho'
        },
      ]
    );
    const res = await request(app)
      .post('/api/vy/rappers')
      .send(allRappers);

    expect(res.body).toEqual([allRappers]);
  });
});
