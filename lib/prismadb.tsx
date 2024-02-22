import { PrismaClient } from "@prisma/client";

declare global{
    var prisma : PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient();

//if else to decide whether we need to have globalthis.prisma or a new prisma client 
// so if we are in development mode , we dont need prisma client always for each change :
if(process.env.NODE_ENV !== 'production'){ //ie., in development mode
    globalThis.prisma = prismadb
}

export default prismadb;