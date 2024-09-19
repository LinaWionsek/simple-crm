import { Component, inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  
  birthDate: Date = new Date();
  firestore: Firestore = inject(Firestore);
  loading = false;

  firstName = '';
  lastName = '';
  email = '';
  street = '';
  zipCode = '';
  city = '';
  notes = '';
 
  constructor( public dialogRef: MatDialogRef<DialogAddUserComponent>) {}


  async saveUser() {

    let user: UserInterface = {
      id: '',
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate.getTime(),
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      notes: this.notes,
    }


    
  // user.birthDate = this.birthDate
  //     ? this.birthDate.getTime()
  //     : user.birthDate;
    // console.log(this.user);
    this.loading = true;

   

    await addDoc(collection(this.firestore, 'users'), user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.loading = false;
        this.dialogRef.close();
      });
     
  }
}
