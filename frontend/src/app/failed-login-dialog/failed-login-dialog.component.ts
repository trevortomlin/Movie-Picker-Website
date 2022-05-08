import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-failed-login-dialog',
  templateUrl: './failed-login-dialog.component.html',
  styleUrls: ['./failed-login-dialog.component.css']
})
export class FailedLoginDialogComponent implements OnInit {

  type:string;

  constructor(

    private dialogRef: MatDialogRef<FailedLoginDialogComponent>,

    @Inject(MAT_DIALOG_DATA) data:any) {

      this.type = data.type;
      
    }

  ngOnInit() {

  }


  close() {
      this.dialogRef.close();
  }

}
