import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';
import { DbService } from './db.service';
import { DataHandlerService } from './data-handler.service';
import { appConstants } from '../app.constants';
interface User
{
  name:string,
  email:string,
  gender:string,
  password:string,
  confirmPassword:string,
  dob:Date,
  role:string,
  hobbiesRunning:boolean,
  hobbiesReading:boolean,
  hobbiesPainting:boolean,
  hobbiesOthers:boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  public currentLoggedInUser:User = JSON.parse(localStorage.getItem('key'));
  signInStatus:string;
  signUpStatus:string;
  signIn(inputEmail:string,inputPassword:string)
  {
    this.db.findUserByEmail(inputEmail.toLowerCase()).then(user=>{
      if(user)
      {
        console.log(user);
        if(inputPassword === this.CS.decrypt(user.password,appConstants.AESKey))
        {
          this.currentLoggedInUser = user;
          localStorage.setItem('key',JSON.stringify(user));
          this.signInStatus = 'login-successful';
        }
        else
        {
          this.signInStatus = 'invalid-credentials';
        }
      }
      else
      {
        this.signInStatus = 'user-not-found';
      }
    }).catch(err=>{console.log('An unexpexted error occured while signing in')});
  }

  signUp(inputUser:User)
  {
    this.db.findUserByEmail(inputUser.email.toLowerCase()).then(user=>{
      if(user)
      {
        this.signUpStatus = 'User Exists ,Click Here to Login';
      }
      else
      {
        inputUser.password = this.CS.encrypt(inputUser.password,appConstants.AESKey);
        inputUser.email = inputUser.email.toLowerCase()
        delete inputUser.confirmPassword;
        this.handler.pushUser(inputUser);
        this.signUpStatus = 'Registration Successful';
      }
    });
  }

  constructor(
    private CS:CryptoService,
    private db:DbService,
    private handler:DataHandlerService
    ) { }
}
