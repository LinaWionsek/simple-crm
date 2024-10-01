import { Component, inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Firestore } from '@angular/fire/firestore';
import { UserInterface } from '../user.interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dialog-add-usernote',
  standalone: true,
  imports: [MatDialogModule, MatProgressBarModule, MatFormFieldModule, FormsModule, MatButtonModule,MatInputModule],
  templateUrl: './dialog-add-usernote.component.html',
  styleUrl: './dialog-add-usernote.component.scss'
})
export class DialogAddUsernoteComponent {
  loading = false;
 
  user!: UserInterface;
  userId!: string;
  data: DataService = inject(DataService);
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogAddUsernoteComponent>){

  }
  async updateUserNote(){
    console.log('Updating user with ID:', this.userId);
    console.log('User before update:', this.user);
    this.loading = true;
    this.data.user = { ...this.user };
    await this.data.updateUser(this.userId);
    this.loading = false;
    this.dialogRef.close();
  }
}

