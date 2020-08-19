import {Request, Response, NextFunction} from 'express';
import jwt, { decode } from 'jsonwebtoken';

interface DecodedParams{
    id: number;
}

function auth(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).send({
            error: 'No token Provided'
        })
    }

    const parts = authHeader.split(' ');

    if(parts.length !== 2 ){
        return response.status(401).send({
            error: 'Token error'
        })
    }

    const [scheme, token] = parts;

    if(!/^Barer$/i.test(scheme)){
        return response.status(401).send({
            error: 'Token malformed'
        })
    }

    jwt.verify(token, process.env.secret as string, (err, decode) => {
        if(err){
            return response.status(401).send({
                error: 'Token invalid'
            })
        }

        const userId = (decode as DecodedParams).id

        return next()
    })
}

export default auth;
