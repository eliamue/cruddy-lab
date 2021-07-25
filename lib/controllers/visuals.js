import { Router } from 'express';
import Visuals from '../models/Visuals';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const visual = await Visuals.createVisual(req.body);

      res.send(visual);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const visual = await Visuals.getAllVisuals();

      res.send(visual);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const visual = await Visuals.getById(id);

      res.send(visual);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { kgroup, stage_name, real_name } = req.body;
      const updatedVisual = await Visuals.update(id, { kgroup, stage_name, real_name });

      res.send(updatedVisual);
    } catch(err) {
      next(err);
    }
  });
