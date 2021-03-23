import express from 'express';
import { getCars } from '../controllers/car.js';
import { postCar } from '../controllers/car.js';
import { deleteCar } from '../controllers/car.js';
import { patchCar } from '../controllers/car.js';
import { getCar } from '../controllers/car.js';

const routes = express.Router();

routes.get('/', getCars);

routes.post('/', postCar);

routes.delete('/:id', deleteCar);

routes.patch('/:id', patchCar);

routes.get('/:id', getCar);

export default routes;