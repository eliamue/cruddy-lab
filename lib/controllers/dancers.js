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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dancer = await Dancers.getById(id);

      res.send(dancer);
    } catch(err) {
      next(err);
    }
  })
  
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { kgroup, stage_name, real_name } = req.body;
      const updatedDancer = await Dancers.update(id, { kgroup, stage_name, real_name });

      res.send(updatedDancer);
    } catch(err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dancer = await Dancers.delete(id);

      res.send({
        message: `You have deleted ${dancer.stage_name} for some horribly cruel reason. For SHAME.`
      });
    } catch(err) {
      next(err);
    }
  });
