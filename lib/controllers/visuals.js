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
  });
