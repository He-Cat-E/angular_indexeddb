import { Component, EventEmitter, Input, Output} from '@angular/core';
import { TabsService } from '../tabs.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditDailogComponent } from '../add-edit-dailog/add-edit-dailog.component';
import { DbService } from '../../services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataHandlerService } from '../../services/data-handler.service';
import { appConstants } from '../../app.constants'; 
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {
  @Input() inputDataSource = new MatTableDataSource([]);
  @Output() datasourceChanged = new EventEmitter();
  displayedColumnsAll = appConstants.displayedColumnsAll;
  displayedColumnsStudentsAndTeachers = appConstants.displayedColumnsStudentsAndTeachers;
  constructor(
    public tabs:TabsService,
    private DB:DbService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private handler:DataHandlerService
    ){ }

  editUser(element:any)
  {
    this.openDialog('300ms','300ms',element);
    this.dialog.afterAllClosed.subscribe(()=>{
      this.handler.loadUsers().then((data)=>{
        if(data){
        this.inputDataSource=new MatTableDataSource(data);
        this.inputDataSource.filter = this.tabs.currentSelectedtab;
      }
      this.datasourceChanged.emit(this.inputDataSource);
      });
    });
  }
  deleteUser(element:any)
  {
    let answer = window.confirm('are you sure You want to delete '+element.name+' ?');
    if(answer)
    {
      this.DB.deleteUser(element.id).then(()=>{
        this.handler.loadUsers().then((data)=>{
          if(data){
            this.inputDataSource=new MatTableDataSource(data);
            this.inputDataSource.filter = this.tabs.currentSelectedtab;
          }
          this.datasourceChanged.emit(this.inputDataSource);
        });
        this._snackBar.open('user deleted successfully','ok',{
          duration:3000,
          horizontalPosition:'right',
          verticalPosition:'top'
        });
      });
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string,element:any){
    this.dialog.open(AddEditDailogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:element
    });
  }
}
