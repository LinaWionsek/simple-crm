import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { User } from '../models/user.class';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string = '';
  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  user: User = new User();

  unsubUser;

  /**
   * Subscribes to route parameter changes to extract and store the user ID.
   * @param route - The activated route service.
   */
  constructor(private route: ActivatedRoute) {
    this.unsubUser = this.unsubSinlgeUser();
  }

  getUserId() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id !== null) {
        this.userId = id;
      }
    });
  }

  unsubSinlgeUser() {
    this.getUserId();
    return onSnapshot(
      doc(collection(this.firestore, 'users'), this.userId),
      (element) => {
        console.log(element.data());
        this.user = new User(element.data());
      }
    );
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  /**
 * Opens a dialog to edit the user's address information.
 * 
 * This method creates and opens an instance of DialogEditAddressComponent.
 * It passes the current user object to the dialog component. 
 * This allows the dialog component to work with the current user's data, presumably to edit address information.
 * 
 * 
 */
  editMenu(){
   const dialog = this.dialog.open(DialogEditAddressComponent);
   dialog.componentInstance.user = this.user; 
   // dialog.componentInstance damit wird auf die neue Komponente zugegriffen mit .user auf die user variable
   // user in the DialogEditAddressComponent gets the information of the user in this component
  }

  editUserDetail(){
    this.dialog.open(DialogEditUserComponent)
  }

  
}
