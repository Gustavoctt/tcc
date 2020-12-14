import express from 'express';

import multer from  'multer';
import multerConfig from './config/multer';
import { celebrate, Joi} from 'celebrate';

import BusinessController from './controllers/BusinessController';
import ActingController from './controllers/ActingController';

const routes = express.Router();
const upload = multer(multerConfig);

const businessController = new BusinessController();
const actingController = new ActingController();


routes.get('/acting', actingController.index);
routes.get('/business', businessController.index);
routes.get('/business/:id', businessController.show);

routes.post('/business',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            instagram: Joi.string().required(),
            bio: Joi.string().required(),
            longitude: Joi.number().required(),
            latitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            actings: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    businessController.create    
);

export default routes;