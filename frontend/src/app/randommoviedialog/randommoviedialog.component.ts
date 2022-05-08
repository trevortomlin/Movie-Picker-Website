import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-randommoviedialog',
  templateUrl: './randommoviedialog.component.html',
  styleUrls: ['./randommoviedialog.component.css']
})
export class RandommoviedialogComponent implements OnInit {

  name: string;
  title: string;

  constructor(

    private dialogRef: MatDialogRef<RandommoviedialogComponent>,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) data:any) {

      this.name = data.name;
      this.title = data.title;
      
    }

  ngOnInit() {

  }

  onClose(): void {
    this.dialog.closeAll();
  }

  close() {
      this.dialogRef.close();
  }

}
