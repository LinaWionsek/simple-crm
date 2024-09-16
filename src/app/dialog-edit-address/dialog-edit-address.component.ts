import { Component, inject } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { User } from '../models/user.class';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatFormFieldModule, MatProgressBarModule, MatDialogModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user!: User;
  loading = false;
  userId!: string;
  firestore: Firestore = inject(Firestore);


  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){

  }
  async updateAddress(){
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
