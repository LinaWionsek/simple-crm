import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogAddUsernoteComponent } from '../dialog-add-usernote/dialog-add-usernote.component';
import { DataService } from '../data.service';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string = '';
  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  user = {} as UserInterface;
  userdata = inject(DataService);
  temporalUser = {} as UserInterface;

  /**
   * Subscribes to route parameter changes to extract and store the user ID.
   * @param route - The activated route service.
   */
  constructor(private route: ActivatedRoute) {
    this.getSingleUser();
  }

  getUserId() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id !== null) {
        this.userId = id;
      }
    });
  }

  getSingleUser() {
    this.getUserId();
    this.userdata.unsubSinlgeUser(this.userId);
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
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.userId = this.userId;
    //  dialog.componentInstance.user = this.userdata.user;
    // dialog.componentInstance damit wird auf die neue Komponente zugegriffen mit .user auf die user variable
    // user in the DialogEditAddressComponent gets the information of the user in this component
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.userId = this.userId;
    this.temporalUser = { ...this.userdata.user };
    dialog.componentInstance.user = this.temporalUser;
    console.log('temproralUser: ', this.temporalUser)
    console.log('user: ', this.userdata.user)




    // ------------------------------------------------------
    // dialog.componentInstance.user = new User(this.user.toJSON());
    // dialog.componentInstance.user = JSON.parse(JSON.stringify(this.user));

    // console.log(this.user.toJSON())
  }

  addNotes() {
    const dialog = this.dialog.open(DialogAddUsernoteComponent);
    dialog.componentInstance.userId = this.userId;
    // dialog.componentInstance.user = new User(this.user.toJSON());

    // console.log(this.user.toJSON())
  }
}
