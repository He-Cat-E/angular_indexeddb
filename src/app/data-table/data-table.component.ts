import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataHandlerService } from '../services/data-handler.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AddEditDailogComponent } from './add-edit-dailog/add-edit-dailog.component';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../services/db.service';
import { TabsService } from './tabs.service';
import { appConstants } from '../app.constants';
interface User
{
  name:string,
  email:string,
  password:string,
  gender:string,
  role:string
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})

export class DataTableComponent implements OnInit{
  displayedColumnsAll = appConstants.displayedColumnsAll;
  displayedColumnsStudentsAndTeachers = appConstants.displayedColumnsStudentsAndTeachers;
  dataSource = new MatTableDataSource([]);
  selectedRole?:string;
  constructor(
    public AS:AuthService,
    public DB:DbService,
    public handler:DataHandlerService,
    private _liveAnnouncer:LiveAnnouncer,
    public dialog: MatDialog,
    public tabs:TabsService
  ){ }

  ngOnInit(): void {
    this.handler.loadUsers().then((data)=>{
      if(data){
      this.dataSource=new MatTableDataSource(data);
    }
    });
   }
  /**apply filter */
  applyFilter(filter:MatTabChangeEvent)
  {
    const filters = ['','teacher','student'];
    this.dataSource.filter = filters[filter.index].trim().toLowerCase();
    this.tabs.currentSelectedtab = filters[filter.index];
    this.handler.loadUsers().then((data)=>{
      if(data){
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.filter = this.tabs.currentSelectedtab;
    }
    });
  }

  addUser()
  {
    this.openDialog('300ms','300ms',null);
    this.dialog.afterAllClosed.subscribe(()=>{
      this.handler.loadUsers().then((data)=>{
        if(data){
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.filter = this.tabs.currentSelectedtab;
      }
      });
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,element:User){
    this.dialog.open(AddEditDailogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:element
    });
  }
}
