import { Request, Response, request, response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcryptjs';

class UsersController{
    async create( request: Request, response: Response ){
        const {
            name,
            email,
            password
        } = request.body;
    
        //const trx = await knex.transaction();
        
        const passwordHash = bcrypt.hashSync(password);

        const user = {
            name,
            email,
            passwordHash
        }
        
        const insertUsers = await knex('users').insert(user);
            
        const user_id = insertUsers[0];
    
        return response.json({
            id: user_id,
            password,
            ...user
         });
    }

    async returnAll(request: Request, response: Response){
        
        const users = await knex('users').select('*')

        return response.json({ users });
    }

    async compare(request: Request, response: Response){
        
        const users = await knex('users').where({
                                email: 'gustavocarrertartare@gmail.com',
                                passwordHash:  '$2a$10$Ox7OrLeXHx1vciVnT7HGUOuRxqvZVvHPBP5NlwfJENNPRu7KOuwBa'
                                }).select('*')

        return response.json(users);
    }
};

export default UsersController;