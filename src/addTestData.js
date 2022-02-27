const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const userCount = 3;
const imageCount = 200;

const prisma = new PrismaClient();

const testUsers = [];
const makeid = (length) => {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

for(let i=0; i < userCount; i++) {
	testUsers.push({userName: makeid(10), })
}

prisma.users.addMany({
	data: testUsers
}).then(addedUsers => {
	console.log(addedUsers);
});

for(let i=0; i < imageCount; i++){
	const uuid = uuidv4();
	fs.copyFile('testImage.png', 'imageUploads/'+uuid+'.png', (err) => {
		if (err) console.log(err);
	});
	prisma.image.create({
		data: {UID: uuid}
	});
	prisma.usersInImage.insert({
		
	})
}

for(let user of addedUsers){
	
}
