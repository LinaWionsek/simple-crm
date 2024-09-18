import { Component, inject } from '@angular/core';
import { User } from '../models/user.class';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-usernote',
  standalone: true,
  imports: [MatDialogModule, MatProgressBarModule, MatFormFieldModule, FormsModule, MatButtonModule,MatInputModule],
  templateUrl: './dialog-add-usernote.component.html',
  styleUrl: './dialog-add-usernote.component.scss'
})
export class DialogAddUsernoteComponent {
  loading = false;
  user!: User;
  userId!: string;
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogAddUsernoteComponent>){

  }
  async updateUserNote(){
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

