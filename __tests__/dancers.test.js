import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Dancers from '../lib/models/Dancers';

describe('dancers routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new dancer', async () => {
    const twice = {
      kgroup: 'Twice',
      name: 'Momo'
    };
    const res = await request(app)
      .post('/api/v1/dancers')
      .send(twice);

    expect(res.body).toEqual({
      id: '1',
      ...twice
    });
  });

  it('gets all dancers', async () => {
    const twice = await Dancers.createDancer(
      {
        kgroup: 'Twice',
        name: 'Momo'
      });
  
    const exo = await Dancers.createDancer(
      {
        kgroup: 'Exo', 
        name: 'Kai'
      });
  
    const gg = await Dancers.createDancer(
      {
        kgroup: 'Girls Generation', 
        name: 'Hyoyeon'
      });
  
    const beg = await Dancers.createDancer(
      {
        kgroup: 'Brown Eyed Girls', 
        name: 'Gain'
      });
  
    const bts = await Dancers.createDancer(
      {
        kgroup: 'BTS', 
        name: 'J-Hope'
      });

    const res = await request(app)
      .get('/api/v1/dancers');

    expect(res.body).toEqual([twice, exo, gg, beg, bts]);
  });

  it('gets one vocalist by id', async () => {
    const exo = await Dancers.createDancer({
      kgroup: 'Exo',
      name: 'Kai'
    });
    const res = await request(app)
      .get(`/api/v1/dancers/${exo.id}`);
    expect(res.body).toEqual(exo);
  });


});
