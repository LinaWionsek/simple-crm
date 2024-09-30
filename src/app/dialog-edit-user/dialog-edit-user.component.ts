import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { DataService } from '../data.service';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatProgressBarModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user!: UserInterface;
  loading = false;
  userId!: string;
  data: DataService = inject(DataService);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('Initial user:', this.user);
  }
  async updateUser2() {
    console.log('Updating user with ID:', this.userId);
    console.log('User before update:', this.user);
    this.loading = true;
    this.data.user = { ...this.user };
    await this.data.updateUser(this.userId);
    this.loading = false;
    this.dialogRef.close();
  }
}
