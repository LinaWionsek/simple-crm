import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);

  user = new User();
  allUsers: User[] = [];
  // allUsers: any[] = [];
  
  unsubUsers;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubUsers = this.unsubUserList();
  }

  unsubUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = []; // empty the array before adding new items
      list.forEach((element) => {
        let receivedData = new User(element.data(), element.id);
        console.log(element.id)
        if(receivedData) {
          this.allUsers.push(receivedData);
        }
      });
      console.log(this.allUsers);
    });
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
