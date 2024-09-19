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

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    this.unsubUsers = this.unsubUserList();
   }

  // user = new User();
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


async addUser(user : UserInterface) {
  this.loading = true;
  await addDoc(this.getUsersRef(), user)
  .catch((err) => {
    console.error(err);
  })
  .then((docRef) => {
    console.log('Document written with ID: ', docRef?.id);
    // this.loading = false;
  });
}

  getUsersRef() {
    return collection(this.firestore, 'users');
  }


  ngOnDestroy() {
    this.unsubUsers();
  }



  
}
