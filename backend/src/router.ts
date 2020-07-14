import express, { request, response } from 'express';
import UsersController from './controllers/UsersControllers';

const routes = express.Router();
const usersController = new UsersController();

routes.get('/', (request, response) => {
    return response.json({message: 'Hello'})
});

routes.post('/users', usersController.create);
routes.get('/users', usersController.compare);
routes.get('/allusers', usersController.returnAll);

export default routes;