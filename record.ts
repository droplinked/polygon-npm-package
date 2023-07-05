import {NFTStorage} from "nft.storage";
import {ethers} from 'ethers';
import {abi, contractAddress, provider} from './polygonConstants'
async function uploadToIPFS(metadata: any, apiKey : string) {
    const client = new NFTStorage({ token : apiKey});
    if (typeof(metadata) == typeof({}) || typeof(metadata) == typeof([])){
        metadata = JSON.stringify(metadata);
    }
    const ipfs_hash = await client.storeBlob(new Blob([metadata]));
    return ipfs_hash;
}
/**
 * 
 * @param sku_properties The properties of the sku, in a json object (coule be anything)
 * @param address The address of the user who is minting the NFT
 * @param product_title The title of the product
 * @param discription The discription of the product (It would be shown on the NFT marketplace)
 * @param image_url The url of the image of the product
 * @param price The price of the product in USD (Note : You should pass the price multiplied by 100, for example, if the price is 1.5 USD, you should pass 150)
 * @param amount The amount of NFTs to mint
 * @param comission The comission to be paid to the NFT marketplace (Note : You should pass the comission multiplied by 100, for example, if the comission is 12.34%, you should pass 1234)
 * @param apiKey The API key of the NFT storage
 * @returns The transaction hash of the transaction
 * @throws "Address does not match signer address" If the address passed does not match the signer address
 * @throws "Transaction Rejected" If the transaction is rejected by the user
 */
export async function record_merch(sku_properties : any, address : string, product_title : string, discription : string, image_url : string , price : number , amount : number, comission : number, apiKey : string){
    const signer = await provider.getSigner();
    if(signer.address.toLocaleLowerCase() != address.toLocaleLowerCase()){
        throw "Address does not match signer address";
    }
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let metadata = {
        "name" : product_title,
        "description" : discription,
        "image" : image_url,
        "properties" : sku_properties
    }
    let ipfs_hash = await uploadToIPFS(metadata,apiKey);
    try{
        let tx = await contract.mint(`ipfs://${ipfs_hash}`,price,comission, amount);
        return tx.hash;
    }catch(e){
        if (e.code.toString() == "ACTION_REJECTED"){
            throw "Transaction Rejected";
        }
        throw e;
    }
}