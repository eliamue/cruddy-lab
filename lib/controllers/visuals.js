import { Router } from 'express';
import Visual from '../models/Visual';

// hellow world
export default Router()
  .post('/', async (req, res, next) => {
    try {
      const visual = await Visual.createVisual(req.body);

      res.send(visual);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const visual = await Visual.getAllVisuals();

      res.send(visual);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const visual = await Visual.getById(id);

      res.send(visual);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { kgroup, stage_name, real_name } = req.body;
      const updatedVisual = await Visual.update(id, { kgroup, stage_name, real_name });

      res.send(updatedVisual);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const visual = await Visual.delete(id);

      res.send({
        message: `You have deleted ${visual.stage_name}. Not sure how you sleep at night, but okay.`
      });
    } catch(err) {
      next(err);
    }
  });
