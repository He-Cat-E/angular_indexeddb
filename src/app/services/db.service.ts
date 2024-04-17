import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface IUser 
{
  name:string,
  email:string,
  password:string,
  confirmPassword:string,
  gender:string,
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
export class DbService extends Dexie{
  users:Dexie.Table<IUser,number>;
  constructor() { 
    super('console-db');
    this.version(1).stores({
      users:'++id,name,email,password,gender,role'
    });
    this.users = this.table('users');
  }

  async getAllUsers():Promise<IUser[]>
  {
    return await this.users.toArray();
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    return await this.users.where('email').equals(email).first();
  }

  async updateUser(id:number,newUser:IUser):Promise<number>
  {
    return await this.table('users').update(id,newUser);
  }

  async deleteUser(id: number):Promise<void> {
    return await this.table('users').delete(id);
  }
}
