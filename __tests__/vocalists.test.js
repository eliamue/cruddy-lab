import pool from '../lib/utils/pool';
import setup from '../data/setup';
import request from 'supertest';
import app from '../lib/app';
import Vocalists from '../lib/models/Vocalists';

describe('vocalists routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new vocalist', async () => {
    const gIdle = {
      kgroup: '(G)I-dle',
      stage_name: 'Minnie',
      real_name: 'Nicha Yontararak'
    };
    const res = await request(app)
      .post('/api/v1/vocalists')
      .send(gIdle);

    expect(res.body).toEqual({
      id: '1',
      ...gIdle
    });
  });

  it('gets all vocalists', async () => {
    const gIdle = await Vocalists.createVocalist(
      {
        kgroup: '(G)I-dle', 
        stage_name: 'Minnie',
        real_name: 'Nicha Yontararak'
      });

    const mamamoo = await Vocalists.createVocalist(
      {
        kgroup: 'Mamamoo', 
        stage_name: 'Hwasa',
        real_name: 'Ahn Hye-jin'
      });

    const bts = await Vocalists.createVocalist(
      {
        kgroup: 'BTS', 
        stage_name: 'V',
        real_name: 'Kim Tae-hyung'
      });

    const ateez = await Vocalists.createVocalist(
      {
        kgroup: 'Ateez', 
        stage_name: 'Jongho',
        real_name: 'Choi Jong-ho'
      });

    const itzy = await Vocalists.createVocalist(
      {
        kgroup: 'Itzy', 
        stage_name: 'Lia',
        real_name: 'Choi Ji-su'
      });

    const shinee = await Vocalists.createVocalist(
      {
        kgroup: 'SHINee', 
        stage_name: 'Onew',
        real_name: 'Lee Jin-ki'
      });
        
    const res = await request(app)
      .get('/api/v1/vocalists');

    expect(res.body).toEqual([gIdle, mamamoo, bts, ateez, itzy, shinee]);
  });

  it('gets one vocalist by id', async () => {
    const mamamoo = await Vocalists.createVocalist({
      kgroup: 'Mamamoo',
      stage_name: 'Hwasa',
      real_name: 'Ahn Hye-jin'
    });
    const res = await request(app)
      .get(`/api/v1/vocalists/${mamamoo.id}`);

    expect(res.body).toEqual(mamamoo);
  });

  it('updates the vocalist of a specific existing group', async () => {
    const mamamoo = await Vocalists.createVocalist({
      kgroup: 'Mamamoo',
      stage_name: 'Wheein',
      real_name: ''
    });
    const res = await request(app)
      .put(`/api/v1/vocalists/${mamamoo.id}`)
      .send({
        stage_name: 'Wheein',
        real_name: 'Jung Whee-in'
      });
    expect(res.body).toEqual({
      ...mamamoo,
      stage_name: 'Wheein',
      real_name: 'Jung Whee-in'
    });
  });

  it('deletes a specific existing vocalist', async () => {
    const vocalist = await Vocalists.createVocalist({
      kgroup: 'Itzy',
      stage_name: 'Lia',
      real_name: 'Choi Ji-su'
    });
    const res = await request(app)
      .delete(`/api/v1/vocalists/${vocalist.id}`);

    expect(res.body).toEqual({
      message: `${vocalist.stage_name} has been deleted. What did ${vocalist.stage_name} do to deserve that!?`
    });
  });
});
