import { Component, inject } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { User } from '../models/user.class';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatProgressBarModule, MatDialogModule, FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user!: User;
  loading = false;
  birthDate!: Date;
  userId!: string;
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){

  
  }
  async updateUser(){
    this.loading = true;
    await updateDoc(this.getSingleDocRef(), this.user.toJSON())
    .catch((err) => { console.error(err)})
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

  getSingleDocRef() {
    return doc(collection(this.firestore, 'users'), this.userId);
  }
  
}
