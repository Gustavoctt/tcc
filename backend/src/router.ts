import express from 'express';
import BusinessController from './controllers/BusinessController';
import ActingController from './controllers/ActingController';

const routes = express.Router();
const businessController = new BusinessController();
const actingController = new ActingController();


routes.post('/business', businessController.create);
routes.get('/business/:id', businessController.show);
routes.get('/business', businessController.index);

routes.get('/acting', actingController.index);

export default routes;