import { inject, Injectable } from '@angular/core';
import { User } from './models/user.class';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { UserInterface } from './user.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    this.unsubUsers = this.unsubUserList();
   }

  user = new User();
  allUsers: User[] = [];
  loading = false;
  
  unsubUsers;

  firestore: Firestore = inject(Firestore);


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

  async addUser(user: UserInterface) {
    await addDoc(collection(this.firestore, 'users'), user)
    .catch((err) => {
      console.error(err);
    })
    .then((docRef: any) => {
      console.log('Document written with ID: ', docRef?.id);
      this.loading = false;
      // dialogRef.close();
      // this.dialogRef.close();
    });

  }

 removeUndefined(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }




  ngOnDestroy() {
    this.unsubUsers();
  }



  
}
