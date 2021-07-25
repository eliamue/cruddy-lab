import { Router } from 'express';
import Leaders from '../models/Leaders';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const leader = await Leaders.createLeader(req.body);

      res.send(leader);
    } catch(err) {
      next(err);
    } 
  })

  .get('/', async (req, res, next) => {
    try {
      const leader = await Leaders.getAllLeaders();

      res.send(leader);
    } catch(err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const leader = await Leaders.getById(id);

      res.send(leader);
    } catch(err) {
      next(err);
    }
  });
