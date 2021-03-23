import express from 'express';
import { getRents } from '../controllers/rent.js';
import { postRent } from '../controllers/rent.js';
import { deleteRent } from '../controllers/rent.js';
import { patchRent } from '../controllers/rent.js';
import { getRent } from '../controllers/rent.js';

const routes = express.Router();

routes.get('/', getRents);

routes.post('/', postRent);

routes.delete('/:id', deleteRent);

routes.patch('/:id', patchRent)

routes.get('/:id', getRent);

export default routes;