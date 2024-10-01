import { Component, inject } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UserInterface } from '../user.interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatFormFieldModule, MatProgressBarModule, MatDialogModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user!: UserInterface;
  loading = false;
  userId!: string;
  data: DataService = inject(DataService);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){

  }

  async updateAddress(){
    this.loading = true;
    this.data.user = { ...this.user };
    await this.data.updateUser(this.userId);
    this.loading = false;
    this.dialogRef.close();
  }


}
