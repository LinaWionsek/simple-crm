import { inject, Injectable } from '@angular/core';
import { User } from './models/user.class';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    this.unsubUsers = this.unsubUserList();
   }

  user = new User();
  allUsers: User[] = [];

  
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

  ngOnDestroy() {
    this.unsubUsers();
  }



  
}
