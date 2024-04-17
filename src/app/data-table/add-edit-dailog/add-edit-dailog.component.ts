import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DbService } from '../../services/db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptoService } from '../../services/crypto.service';
import { DataHandlerService } from '../../services/data-handler.service';
import { appConstants } from '../../app.constants';
import { TabsService } from '../tabs.service';
@Component({
  selector: 'app-add-edit-dailog',
  templateUrl: './add-edit-dailog.component.html',
  styleUrl: './add-edit-dailog.component.css'
})
export class AddEditDailogComponent { 
  form: FormGroup;
  emailRegx = appConstants.emailRegx;
  today:Date;
  isSubmitted=false;
  constructor(
    public dialogRef: MatDialogRef<AddEditDailogComponent>,
    private formBuilder:FormBuilder,
    private DB:DbService,
    private _snackBar:MatSnackBar,
    private CS:CryptoService,
    private handler:DataHandlerService,
    public tabs:TabsService,
    private db:DbService,
    @Inject(MAT_DIALOG_DATA) public data:any 
    ) {
      this.form = this.formBuilder.group({
        name:[this.data?.name,[Validators.required,Validators.pattern(appConstants.spaceValidator)]],
        email: [this.data?.email, [Validators.required, Validators.pattern(this.emailRegx)]],
        password: [this.data?.password],
        confirmPassword: [this.data?.password],
        gender:[this.data?.gender,[Validators.required]],
        role:[this.data?.role,[Validators.required]],
        dob:[this.data?.dob,[Validators.required]],
        hobbiesRunning:[this.data?.hobbiesRunning], 
        hobbiesReading:[this.data?.hobbiesReading],
        hobbiesPainting:[this.data?.hobbiesPainting],
        hobbiesOthers:[this.data?.hobbiesOthers],
      });
      this.today = new Date();
      if(this.form.value.email!==null)
      {
        this.form.get('email').disable();
      }
    }
  
  edit()
  {
    this.isSubmitted = true;
    this.markAllAsTouched(this.form);
    if(!this.form.valid)
    {
      return;
    }
    if(this.data === null)
    {
      this.db.findUserByEmail(this.form.value.email.toLowerCase()).then(user=>{
        if(user)
        {
          this.openSnackBar('User Already Exists');
        }
        else
        {
          this.form.value.password = this.CS.encrypt(appConstants.defaultPassword,appConstants.AESKey);
          this.form.value.confirmPassword = this.form.value.password;
          delete this.form.value.confirmPassword;
          this.form.value.email = this.form.value.email.toLowerCase();
          this.handler.pushUser(this.form.value);
          this.openSnackBar('User Added successfully');
          this.dialogRef.close();
        }
      });
      return;
    }    
    this.DB.updateUser(this.data.id,this.form.value).then(()=>{
      this.openSnackBar('User Updated successfully');
      if(this.data.role !== this.form.value.role)
      {
        this.tabs.roleChanged = true;
      }
    }).catch(err=>{
      this.openSnackBar('Error');
    });
    this.dialogRef.close();
  }

  openSnackBar(msg:string)
  {
    this._snackBar.open(msg,'ok',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top'
    });
  }
  ignoreSpace(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
  markAllAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        // If the control is a FormGroup, recurse into it
        this.markAllAsTouched(control);
      } else {
        // Otherwise, mark the control as touched
        control.markAsTouched();
      }
    });
  }
}
