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
  });
