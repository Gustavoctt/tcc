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
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

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

        const {email, passwordHash, password} = request.body;

        /*const passwordDecrypt = bcrypt.compareSync(password, passwordHash);

        if(passwordDecrypt === true){
            return response.json({message: 'foi'})
        }*/

        const users = await knex('users').where({
                                email: email,
                                passwordHash:  passwordHash
                                }).select('*')

        return response.json({message: 'Encontrou'});
        }

        //console.log(passwordDecrypt)
        
};

export default UsersController;