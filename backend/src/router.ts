import express, { request, response } from 'express';
import UsersController from './controllers/UsersControllers';
import BusinessController from './controllers/BusinessController';
import ActingController from './controllers/ActingController';

const routes = express.Router();
const usersController = new UsersController();
const businessController = new BusinessController();
const actingController = new ActingController();


routes.post('/users', usersController.register);

routes.post('/login', usersController.login);


routes.post('/business', businessController.create);
routes.get('/business/:id', businessController.show);
routes.get('/business', businessController.index);

routes.get('/acting', actingController.index);

export default routes;