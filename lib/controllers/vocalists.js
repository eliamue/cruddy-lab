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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const vocalist = await Vocalists.getById(id);

      res.send(vocalist);
    } catch(err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { kgroup, name } = req.body;
      const updatedVocalist = await Vocalists.update(id, { kgroup, name });

      res.send(updatedVocalist);
    } catch(err) {
      next(err);
    }
  });
