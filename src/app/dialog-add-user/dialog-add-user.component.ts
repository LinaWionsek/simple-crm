import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserInterface } from '../user.interface';
import { DataService } from '../data.service';

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
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  birthDate: Date = new Date();
  data: DataService = inject(DataService);
  loading = false;

  firstName = '';
  lastName = '';
  email = '';
  street = '';
  zipCode = '';
  city = '';
  notes = '';

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  async saveUser() {
    let user: UserInterface = this.returnAsJSON()
    this.loading = true;
    await this.data.addUser(user as UserInterface);
    this.loading = false;
    this.dialogRef.close();
  }

  returnAsJSON() {
    return {
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
  }
}
