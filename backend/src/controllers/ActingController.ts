import { Request, Response, request, response } from 'express';
import knex from '../database/connection';

class ActingController{
    async index(request: Request, response:Response){
        const acting = await knex('acting').select('*');

        const serializedItems = acting.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.122:3333/uploads/${item.image}`,
            };
        });

        return response.json(serializedItems)
    }
}

export default ActingController;