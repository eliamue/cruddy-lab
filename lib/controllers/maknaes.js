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
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const maknae = await Maknaes.getById(id);

      res.send(maknae);
    } catch(err) {
      next(err);
    }
  })
  
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { kgroup, stage_name, real_name } = req.body;
      const updatedMaknae = await Maknaes.update(id, { kgroup, stage_name, real_name });

      res.send(updatedMaknae);
    } catch(err) {
      next(err);
    }
  });
