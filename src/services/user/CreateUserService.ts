import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserService{
    async execute({name, email, password}: UserRequest){

       //Verificar se enviou um email
       if(!email){
        throw new Error("Email incorrect")
       }

       //Verificar se o email já está cadastrado
       const userAlreadExists = await prismaClient.user.findFirst({
        where:{
            email: email
        }
       })

       if(userAlreadExists){
        throw new Error("User Already exists");
       }

       // CRIPTOGRAFANDO SENHA USANDO BCRYPT JS
       const passwordHash = await hash(password, 8)

       // CADASTRO DE USUARIO
       const user = await prismaClient.user.create({
        data:{
            name: name,
            email: email,
            password: passwordHash,
            },
        select:{
            id:true,
            name:true,
            email:true,
            }
        })

        return user;
    }
}

export {CreateUserService}