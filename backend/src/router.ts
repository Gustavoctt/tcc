import express, { request, response } from 'express';
import UsersController from './controllers/UsersControllers';
import BusinessController from './controllers/BusinessController';
import ActingController from './controllers/ActingController';
import ProfileController from './controllers/ProfileController';

const routes = express.Router();
const usersController = new UsersController();
const businessController = new BusinessController();
const actingController = new ActingController();
const profileController = new ProfileController();

routes.get('/', (request, response) => {
    return response.json({message: 'Hello'})
});

routes.get('/profile', profileController.index)

routes.post('/users', usersController.create);
routes.get('/users', usersController.login);
routes.get('/allusers', usersController.returnAll);

routes.post('/business', businessController.create);
routes.get('/business/:id', businessController.show);
routes.get('/business', businessController.index);

routes.get('/acting', actingController.index);

export default routes;