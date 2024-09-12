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
      
        let rawData = element.data();
        // let receivedData = new User({ ...rawData, id: element.id });
        let receivedData = new User(rawData, element.id);
        console.log(element.id)
        if(receivedData) {
          this.allUsers.push(receivedData);
          console.log('received data', receivedData);
          console.log('raw data', rawData);
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
