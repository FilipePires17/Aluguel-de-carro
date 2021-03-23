import express from 'express';
import { getUsers } from '../controllers/user.js';
import { postUser } from '../controllers/user.js';
import { deleteUser } from '../controllers/user.js';
import { patchUser } from '../controllers/user.js';
import { getUser } from '../controllers/user.js';

const routes = express.Router();

routes.get('/', getUsers);

routes.post('/', postUser);

routes.delete('/:id', deleteUser);

routes.patch('/:id', patchUser)

routes.get('/:id', getUser);

export default routes;