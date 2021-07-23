import { Router } from 'express';
import Vocalists from '../models/Vocalists';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const vocalist = await Vocalists.createVocalist(req.body);

      res.send(vocalist);
    } catch(err) {
      next(err);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const vocalist = await Vocalists.getAllVocalists();

      res.send(vocalist);
    } catch(err) {
      next(err);
    }
  });
