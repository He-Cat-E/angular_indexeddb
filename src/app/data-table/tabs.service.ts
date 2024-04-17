import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  currentSelectedtab:string = '';
  roleChanged = false;
  constructor() { }
}
