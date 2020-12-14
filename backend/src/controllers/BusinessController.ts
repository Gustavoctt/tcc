import { Request, Response } from 'express';
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

    const trx = await knex.transaction();

    const ids = {
        image: request.file.filename,
        name,
        email,
        whatsapp,
        instagram,
        bio,
        longitude,
        latitude,
        city,
        uf
    }

    console.log(ids)

    const insertedIds = await trx('business').insert(ids);

    const business_id = insertedIds[0];

    const businessItems = actings
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((acting_id: number) => {
        return {
            business_id,
            acting_id
        };
    })

    await trx('business_acting').insert(businessItems);

    await trx.commit();

    return response.json({
        id: business_id,
        ...actings
    })
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const business = await knex('business').where('id', id).first();

        if(!business){
            return response.status(400).json({message: 'Negócio não encontrado'})
        }

        const acting = await knex('acting')
                        .join('business_acting', 'acting.id', '=', 'business_acting.acting_id')
                        .where('business_acting.business_id', id)
                        .select('acting.title');


        const serializedBusinnes = {
            ...business,
            image_url: `http://192.168.0.122:3333/uploads/locais/${business.image}`
        }

        return response.json({ business: serializedBusinnes, acting});
    }

    async index(request: Request, response:Response){
        const {city, uf, acting} = request.query;

        const parsedActions = String(acting)
                            .split(',')
                            .map(itemActing => Number(itemActing.trim()));

        const business = await knex('business')
                .join('business_acting', 'business.id', '=', 'business_acting.business_id')
                .whereIn('business_acting.acting_id', parsedActions)
                .where('city', String(city))
                .where('uf', String(uf))
                .distinct()
                .select('business.*');
        
            const serializedPoints = business.map(business => {
                return {
                    ...business,
                    image_url: `http://192.168.0.122:3333/uploads/locais/${business.image}`,
                };
            });

            return response.json(serializedPoints);

            return response.json(business);
    }
}

export default BusinessController;