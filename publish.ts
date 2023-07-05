import {ethers} from 'ethers';
import {abi, contractAddress, provider} from './polygonConstants'
/**
 * 
 * @param address The address of the user who is requesting the NFT to be published
 * @param producer_account_address the address of the producer account
 * @param token_id the token id of the NFT
 * @returns the transaction hash of the transaction
 */
export let publish_request = async function(address: string, producer_account_address: string,token_id: number | string){
    const signer = await provider.getSigner();
    if(signer.address.toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try{
        let tx = await contract.publish_request(producer_account_address,token_id);
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}
