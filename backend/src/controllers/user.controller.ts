import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Context } from 'hono';
import { sign } from 'hono/jwt'

const registerUser = async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
    });

    if (existingUser) {
        c.status(409);
        return c.json({ error: 'Email is already taken!' });
    }

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET)

    return c.json({
        jwt: token
    })
}

const loginUser = async (c: Context) => {
    // const prisma = new PrismaClient({
    //     datasourceUrl: c.env.DATABASE_URL,
    // }).$extends(withAccelerate())

    // const body = await c.req.json();
    // const user = await prisma.user.findUnique({
    //     where: {
    //         email: body.email
    //     }
    // });

    // if(!user){
    //     c.status(403);
    //     return c.json({error: "user not found!"})
    // }

    // const jwt = await sign({id: user.id}, c.env.JWT_SECRET)
    // return c.json({jwt})
}

export {
    registerUser,
    loginUser
}