const  {uploadServer} = require('./uploadFiles');
const { PrismaClient } = require('@prisma/client')
const { v4: uuidv4 } = require('uuid')

const prisma = new PrismaClient()

try{

	uploadServer(prisma);
} catch(err){
	console.error(err);
}
