import { Request, Response, request, response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../database/connection';

interface User{
    id: number;
    name: string;
    email: string;
    password: string;
}

function generareToken(user: User){
    return jwt.sign({ id: user.id }, process.env.secret as string, {
        expiresIn:86400,
    });
}

export default class UsersController{
    async register( request: Request, response: Response ){
        const {
            name,
            email,
            password
        } = request.body;
    
        const user = await db('users').where('email', '=', email).first();

        if(user){
            return response.status(400).json({error: 'User already exists'});
        }

        try {
            const passwordHash = await bcrypt.hash(password, 10);

            await db('users').insert({
                name,
                email,
                password:passwordHash,
            });

            const user = await db('users').where('email', '=', email).first() as User;

            console.log('passou try')
            return response.status(201).send({
                token: generareToken(user)
            }).json({message: 'passou'});
        } catch (error) {

            return response.status(400).json({
                error: 'Unexpected error while registering a new user'
            })
        }
    }

    async login(request: Request, response: Response){
        const {email, password} = request.body;

        console.log(email, password);
        
        const user = await db('users').where('email', '=', email).first() as User;
        
       if(!user){
           return response.status(400).json({
               error: 'User not found'
           });
       };

       if(!await bcrypt.compare(password, user.password)){
           return response.status(400).json({
               error: 'invalid password'
           })
       }

       user.password = '';

       response.send({
           token: generareToken(user),
           user: {
               name: user.name,
               email: user.email,
               password: user.password
           },
       })
    }
};