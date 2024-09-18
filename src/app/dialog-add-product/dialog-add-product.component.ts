import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Product } from '../models/product.class';

@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss',
})
export class DialogAddProductComponent {
  product = new Product();
  // birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading = false;
  constructor(public dialogRef: MatDialogRef<DialogAddProductComponent>) {}
  async saveProduct() {
    // this.user.birthDate = this.birthDate
    //   ? this.birthDate.getTime()
    //   : this.user.birthDate;
    this.loading = true;
    await addDoc(collection(this.firestore, 'products'), this.product.toJSON())
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
