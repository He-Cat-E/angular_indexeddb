import { Injectable } from '@angular/core';
import { DbService,IUser } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  users:IUser[];
  constructor(private db:DbService) { }

  async loadUsers():Promise<IUser[]>
  {
    await this.db.getAllUsers().then(users=>{
      this.users = users;
     
    }).catch( err=>{
      return null;
    });
    return this.users;
  }

  pushUser(user:IUser)
  {
    this.db.users.add(user).then(()=>{
      console.log('user added');
    }).catch((error)=>{
      console.log('user cant be created , already exists');
    });
  }
}
