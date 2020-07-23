import { Request, Response, response, request } from 'express';
import knex from '../database/connection';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

class ProfileController {
    async index(request:Request, response:Response){
        const user_id = request.headers.id;
        const authHeader = request.headers.authorization;

        if(!authHeader){
            return response.status(401).send({ error: "No token provided" });
        }

        try {
            const decoded = await promisify(jwt.verify)(authHeader, "secret");

            console.log(decoded);
            
                    const incidents = await knex('business')
                        .where('user_id', user_id)
                        .select('*');
            
                    //console.log(user_id, incidents, decoded)
            
                    if(!incidents[0]){
                        return response.json({message: "Não encontrado", user_id, authHeader});
                    } 
                    
                    return response.json(incidents);
        } catch (error) {
            return response.status(401).send({ error: "Token invalid" });
        }
            
    }
}

export default ProfileController;