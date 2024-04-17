import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class CryptoService {

  constructor() { }

  encrypt(value:string,key:string)
  {
    let encrypted = CryptoJS.AES.encrypt(value,key).toString();
    return encrypted
  }

  decrypt(value:string,key:string)
  {
    let decrypted = CryptoJS.AES.decrypt(value,key)
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}