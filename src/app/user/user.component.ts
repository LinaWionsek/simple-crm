import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  userdata = inject(DataService)
  
  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
