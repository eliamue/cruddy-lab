import { Router } from 'express';
import Maknaes from '../models/Maknaes';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const maknae = await Maknaes.createMaknae(req.body);

      res.send(maknae);
    } catch(err) {
      next(err);
    } 
  })
  
  
  .get('/', async (req, res, next) => {
    try {
      const maknae = await Maknaes.getAllMaknaes();

      res.send(maknae);
    } catch(err) {
      next(err);
    }
  });
