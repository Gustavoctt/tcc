import { Request, Response, response, request } from 'express';
import knex from '../database/connection';

class ProfileController {
    async index(request:Request, response:Response){
        const user_id = request.headers.authorization;

        const incidents = await knex('business')
            .where('user_id', user_id)
            .select('*');

        console.log(user_id, incidents)

        if(!incidents[0]){
            return response.json({message: "Não encontrado", user_id});
        } 
        
        return response.json(incidents);
            
    }
}

export default ProfileController;