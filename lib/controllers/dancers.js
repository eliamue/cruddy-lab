import { Router } from 'express';
import Dancers from '../models/Dancers';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const dancer = await Dancers.createDancer(req.body);

      res.send(dancer);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const dancer = await Dancers.getAllDancers();

      res.send(dancer);
    } catch(err) {
      next(err);
    }
  });
