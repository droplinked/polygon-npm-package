import {ethers} from 'ethers';
import {abi, contractAddress, provider} from './polygonConstants'
/**
 * 
 * @param address The address of the producer account
 * @param request_id The request id of the request to be approved
 * @returns The transaction hash of the transaction
 */
export let approve_request = async function(address: string,request_id: number): Promise<string>{
    const signer = await provider.getSigner();
    if(signer.address.toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try{
        let tx = await contract.approve_request(request_id);
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}

/**
 * 
 * @param address The address of the publisher account
 * @param request_id The request id of the request to be cancelled (by publisher)
 * @returns The transaction hash of the transaction
 */
export let cancel_request = async function(address: string,request_id: number | string): Promise<string>{
    const signer = await provider.getSigner();
    if(signer.address.toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try{
        let tx = await contract.cancel_request(request_id);
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}

/**
 * 
 * @param address The address of the producer account (Current User)
 * @param request_id The request id of the request to be disapproved
 * @returns The transaction hash of the transaction
 */
export let disapprove_request = async function(address: string,request_id: number | string){
    const signer = await provider.getSigner();
    if(signer.address.toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try{
        let tx = await contract.disapprove(request_id);
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}