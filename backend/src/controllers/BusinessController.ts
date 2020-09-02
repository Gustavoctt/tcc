import { Request, Response, response, request } from 'express';
import knex from '../database/connection';

class BusinessController{
    async create(request: Request, response: Response){
        const {
            name,
            email,
            whatsapp,
            instagram,
            bio,
            longitude,
            latitude,
            city,
            uf,
            actings
        } = request.body;

    //const trx = await knex.transaction();

    const ids = await knex('business').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        instagram,
        bio,
        longitude,
        latitude,
        city,
        uf,
    })

    const businessItems = actings.map((acting_id: number) => {
        return {
            business_id: ids[0],
            acting_id
        };
    })

    console.log(businessItems);

    await knex('business_acting').insert(businessItems);

    return response.json({succes: true})

    //const insertedIds = await knex('business').insert(business);


    /*const businessId = insertedIds[0];

    return response.json({
        id: businessId,
        ...business
    })*/
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const business = await knex('business').where('id', id).first();

        console.log(business)

        if(!business){
            return response.status(400).json({message: 'Negócio não encontrado'})
        }

        const acting = await knex('acting')
                        .join('business_acting', 'acting.id', '=', 'business_acting.acting_id')
                        .where('business_acting.business_id', id)
                        .select('acting.title');

        console.log(acting)

            const serializedBusinnes = {
                ...business,
                image_url: `http://localhost:3333/uploads/${business.image}`
            }
            console.log(serializedBusinnes)

        return response.json({serializedBusinnes, acting});
    }

    async index(request: Request, response:Response){
        const {cidade, estado, acting} = request.query;

        const parsedActions = String(acting)
                            .split(',')
                            .map(itemActing => Number(itemActing.trim()));

        const business = await knex('business')
                .join('business_acting', 'business.id', '=', 'business_acting.business_id')
                .whereIn('business_acting.acting_id', parsedActions)
                .where('cidade', String(cidade))
                .where('estado', String(estado))
                .distinct()
                .select('business.*');

        return response.json(business)
    }
}

export default BusinessController;