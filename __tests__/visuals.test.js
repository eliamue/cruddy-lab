import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Visual from '../lib/models/Visual.js';

describe('visuals routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new visual for a group', async () => {
    const bts = {
      kgroup: 'BTS',
      stage_name: 'Jin',
      real_name: 'Kim Seok-jin'
    };
    const res = await request(app)
      .post('/api/v1/visuals')
      .send(bts);

    expect(res.body).toEqual({
      id: '1',
      ...bts
    });
  });

  it('gets all visuals', async () => {
    const bts = await Visual.createVisual({
      kgroup: 'BTS',
      stage_name: 'Jin',
      real_name: 'Kim Seok-jin'
    });

    const redvelvet = await Visual.createVisual({
      kgroup: 'Red Velvet',
      stage_name: 'Irene',
      real_name: 'Bae Joo-hyun'
    });

    const blackpink = await Visual.createVisual({
      kgroup: 'BlackPink',
      stage_name: 'Jisoo',
      real_name: 'Kim Ji-soo'
    });

    const wondergirls = await Visual.createVisual({
      kgroup: 'Wonder Girls',
      stage_name: 'Sunmi',
      real_name: 'Lee Sun-mi'
    });

    const straykids = await Visual.createVisual({
      kgroup: 'Stray Kids',
      stage_name: 'Hyunjin',
      real_name: 'Hwang Hyun-jin'
    });

    const zea = await Visual.createVisual({
      kgroup: 'ZE:A',
      stage_name: 'Hyungsik',
      real_name: 'Park Hyung-sik'
    });

    const res = await request(app)
      .get('/api/v1/visuals');

    expect(res.body).toEqual([bts, redvelvet, blackpink, wondergirls, straykids, zea]);
  });

  it('grabs one visual by id', async () => {
    const redvelvet = await Visual.createVisual({
      kgroup: 'Red Velvet',
      stage_name: 'Irene',
      real_name: 'Bae Joo-hyun'
    });
    const res = await request(app)
      .get(`/api/v1/visuals/${redvelvet.id}`);

    expect(res.body).toEqual(redvelvet);
  });

  it('updates the visual of a specified existing group', async () => {
    const bts = await Visual.createVisual({
      kgroup: 'BTS',
      stage_name: 'Jin',
      real_name: 'Kim Seok-jin'
    });
    const res = await request(app)
      .put(`/api/v1/visuals/${bts.id}`)
      .send({
        stage_name: 'V',
        real_name: 'Kim Tae-hyung'
      });
    expect(res.body).toEqual({
      ...bts,
      stage_name: 'V',
      real_name: 'Kim Tae-hyung'
    });
  });

  it('deletes a specific existing visual', async () => {
    const visual = await Visual.createVisual({
      kgroup: 'ZE:A',
      stage_name: 'Hyungsik',
      real_name: 'Park Hyung-sik'
    });
    const res = await request(app)
      .delete(`/api/v1/visuals/${visual.id}`);

    expect(res.body).toEqual({
      message: `You have deleted ${visual.stage_name}. Not sure how you sleep at night, but okay.`
    });
  });
});
