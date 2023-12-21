import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        //VERIFICAR SE O EMAIL EXISTE
        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error("User/Password Incorrect")
        }

        //VERIFICAR SE A SENHA ESTÁ CORRETA
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/Password Incorrect")
        }

        //PROSSEGUIR APÓS AS VERIFICAÇÕES - GERAR TOKEN JWR E DEVOLVER OS DADOS
        const token = sign(
            {
                name: user.name,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };