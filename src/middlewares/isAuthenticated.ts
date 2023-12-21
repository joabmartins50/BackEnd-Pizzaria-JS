import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

//PEGAR OS DADOS DO TOKEN - TIPANDO
interface Payload{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //RECEBER O TOKEN
    const authToken = req.headers.authorization;

    if(!authToken){
    return res.status(401).end();
    }

    //Pegar o token depois do beren
    const [, token] = authToken.split(" ")

    try{
        //validar esse token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        //Recuper o Id do Token e colocar dentro da variavel - criando uma tipagem no request
        req.user_id = sub;

        return next();

    }catch(err){
        return res.status(401).end();
    }


}