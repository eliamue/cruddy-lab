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
      name: 'Minnie'
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
        name: 'Minnie'
      });

    const mamamoo = await Vocalists.createVocalist(
      {
        kgroup: 'Mamamoo', 
        name: 'Hwasa'
      });

    const bts = await Vocalists.createVocalist(
      {
        kgroup: 'BTS', 
        name: 'V'
      });

    const shinee = await Vocalists.createVocalist(
      {
        kgroup: 'SHINee', 
        name: 'Taemin'
      });

    const itzy = await Vocalists.createVocalist(
      {
        kgroup: 'Itzy', 
        name: 'Lia'
      });
        
    const res = await request(app)
      .get('/api/v1/vocalists');

    expect(res.body).toEqual([gIdle, mamamoo, bts, shinee, itzy]);
  });

  it('gets one vocalist by id', async () => {
    const mamamoo = await Vocalists.createVocalist({
      kgroup: 'Mamamoo',
      name: 'Hwasa'
    });
    const res = await request(app)
      .get(`/api/v1/vocalists/${mamamoo.id}`);

    expect(res.body).toEqual(mamamoo);
  });

  it('updates the vocalist of a specific existing group', async () => {
    const mamamoo = await Vocalists.createVocalist({
      kgroup: 'Mamamoo',
      name: 'Wheein'
    });
    const res = await request(app)
      .put(`/api/v1/vocalists/${mamamoo.id}`)
      .send({
        name: 'Wheein'
      });
    expect(res.body).toEqual({
      ...mamamoo,
      name: 'Wheein'
    });
  });

  it('deletes a specific existing vocalist', async () => {
    const vocalist = await Vocalists.createVocalist({
      kgroup: 'Itzy',
      name: 'Lia'
    });
    const res = await request(app)
      .delete(`/api/v1/vocalists/${vocalist.id}`);

    expect(res.body).toEqual({
      message: `${vocalist.name} has been deleted. What did ${vocalist.name} do to deserve that!?`
    });
  });
});
