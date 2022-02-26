import {uploadServer} from './uploadFiles';

try{
	uploadServer();
} catch(err){
	console.error(err);
}
