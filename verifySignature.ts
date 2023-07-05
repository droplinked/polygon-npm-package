import { recoverPersonalSignature } from 'eth-sig-util'
/**
 * 
 * @param {string} address 
 * @param {string} signature 
 * @returns 
 */
function verifyEVMSignature(address: string, signature: string){
    let recoveredAddress = recoverPersonalSignature({
        data : "Please sign this message to let droplinked view your PublicKey & Address and validate your identity",
        sig : signature
    });
    return recoveredAddress.toLowerCase() == address.toLowerCase();
}

export {verifyEVMSignature};