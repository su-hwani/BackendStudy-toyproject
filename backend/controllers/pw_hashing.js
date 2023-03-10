// yarn add crypto-js
// crypto-js 모듈 불러오기

import CryptoJS from 'crypto-js'
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY 
const privateKey = process.env.PRIVATE_KEY

// 암호화
export async function encryption(pw){
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(pw), secretKey).toString();
    return encrypted
}

// 복호화 
export async function decryption(db_pw){
    const bytes = CryptoJS.AES.decrypt(db_pw, secretKey)
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decrypted 
}



