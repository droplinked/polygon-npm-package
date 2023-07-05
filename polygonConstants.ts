import {ethers} from 'ethers';
import axios from 'axios';
async function getContractAddress(){
    let result = String((await axios.get("https://apiv2dev.droplinked.com/storage/contractAddressPolygon")).data.value);
    return result;
}
async function getContractABI(){
	let result = (await axios.get("https://apiv2dev.droplinked.com/storage/polygonABI")).data.value;
	result = atob(result);
	result = JSON.parse(result);
	return result;
}
let abi : any;
getContractABI().then((result) => {
	abi = result;
});
let contractAddress : string = "";
getContractAddress().then((result) => {
	contractAddress = result;
});
export {abi, contractAddress};
export const provider = new ethers.BrowserProvider((window as any).ethereum);