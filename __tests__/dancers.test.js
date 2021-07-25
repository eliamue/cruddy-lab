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
      stage_name: 'Momo',
      real_name: 'Hirai Momo'
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
        stage_name: 'Momo',
        real_name: 'Hirai Momo'
      });
  
    const exo = await Dancers.createDancer(
      {
        kgroup: 'Exo', 
        stage_name: 'Kai',
        real_name: 'Kim Jong-in'
      });
  
    const gg = await Dancers.createDancer(
      {
        kgroup: 'Girls Generation', 
        stage_name: 'Hyoyeon',
        real_name: 'Kim Hyo-yeon'
      });
  
    const beg = await Dancers.createDancer(
      {
        kgroup: 'Brown Eyed Girls', 
        stage_name: 'Gain',
        real_name: 'Son Ga-in'
      });
  
    const bts = await Dancers.createDancer(
      {
        kgroup: 'BTS', 
        stage_name: 'J-Hope',
        real_name: 'Jung Ho-seok'
      });

    const res = await request(app)
      .get('/api/v1/dancers');

    expect(res.body).toEqual([twice, exo, gg, beg, bts]);
  });

  it('gets one vocalist by id', async () => {
    const exo = await Dancers.createDancer({
      kgroup: 'Exo',
      stage_name: 'Kai',
      real_name: 'Kim Jong-in'
    });
    const res = await request(app)
      .get(`/api/v1/dancers/${exo.id}`);
    expect(res.body).toEqual(exo);
  });

  it('updates the dancer of a specific existing group', async () => {
    const bts = await Dancers.createDancer({
      kgroup: 'BTS',
      stage_name: 'Jimin',
      real_name: 'Park Ji-min' 
    });
    const res = await request(app)
      .put(`/api/v1/dancers/${bts.id}`)
      .send({
        stage_name: 'Jimin',
        real_name: 'Park Ji-min' 
      });
    expect(res.body).toEqual({ 
      ...bts, 
      stage_name: 'Jimin',
      real_name: 'Park Ji-min'  
    });
  });

  it('deletes a specific existing dancer', async () => {
    const dancer = await Dancers.createDancer({
      kgroup: 'Girls Generation',
      stage_name: 'Hyoyeon',
      real_name: 'Kim Hyo-yeon'
    });
    const res = await request(app)
      .delete(`/api/v1/dancers/${dancer.id}`);

    expect(res.body).toEqual({
      message: `You have deleted ${dancer.stage_name} for some horribly cruel reason. For SHAME.`
    });
  });
});

