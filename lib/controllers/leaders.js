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
  });
