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
  })

  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { kgroup, stage_name, real_name } = req.body;
      const updatedRapper = await Rappers.update(id, { kgroup, stage_name, real_name });

      res.send(updatedRapper);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const rapper = await Rappers.delete(id);

      res.send({
        message: `${rapper.stage_name} has been removed. Poor ${rapper.stage_name}!`
      });
    } catch(err) {
      next(err);
    }
  });

