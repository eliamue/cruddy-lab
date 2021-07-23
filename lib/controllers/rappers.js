import { Router } from 'express';
import Rappers from '../models/Rappers';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const rapper = await Rappers.createRapper(req.body);

      res.send(rapper);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const rapper = await Rappers.getAllRappers();

      res.send(rapper);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const rapper = await Rappers.getById(id);

      res.send(rapper);
    } catch(err) {
      next(err);
    }
  });
