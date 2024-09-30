import { inject, Injectable } from '@angular/core';
import { User } from './models/user.class';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {
    this.unsubUsers = this.unsubUserList();
  }

  allUsers: User[] = [];
  user = {} as UserInterface;
  unsubUsers;
  currentUserID: string | undefined = '';
  firestore: Firestore = inject(Firestore);

  unsubUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = []; // empty the array before adding new items
      list.forEach((element) => {
        let receivedData = new User(element.data(), element.id);
        if (receivedData) {
          this.allUsers.push(receivedData);
        }
      });
    });
  }

  async addUser(user: UserInterface) {
    await addDoc(this.getUsersRef(), user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.currentUserID = docRef?.id;
        console.log('Current User ID: ', this.currentUserID);
      });
  }

  unsubSinlgeUser(id: string) {
    return onSnapshot(doc(this.getUsersRef(), id), (element) => {
      console.log(element.data());
      this.user = element.data() as UserInterface;
      this.handleBirthDate();
    });
  }

  handleBirthDate() {
    if (this.user.birthDate) {
      if (typeof this.user.birthDate === 'number') {
        this.user.birthDate = new Date(this.user.birthDate);
      } else if (!(this.user.birthDate instanceof Date)) {
        this.user.birthDate = new Date(this.user.birthDate);
      }

      if (!isNaN(this.user.birthDate.getTime())) {
        this.user.formattedBirthDate =
          this.user.birthDate.toLocaleDateString('en-US');
      } else {
        console.error('Invalid Date:', this.user.birthDate);
        this.user.birthDate = null;
        this.user.formattedBirthDate = '';
      }
    } else {
      this.user.birthDate = null;
      this.user.formattedBirthDate = '';
    }

    console.log('Handled birthDate:', this.user.birthDate);
    console.log('Formatted birthDate:', this.user.formattedBirthDate);
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  async updateUser(docId: string) {
    this.handleBirthDate();

    const updatedUser = this.getCleanJson(this.user);
    console.log('Updating user:', updatedUser);
    await updateDoc(this.getSingleDocRef(docId), updatedUser)
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        console.log('User updated successfully');
      });
  }

  getSingleDocRef(docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }

  getCleanJson(user: UserInterface) {
    return {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      birthDate:
        user.birthDate instanceof Date
          ? user.birthDate.getTime()
          : user.birthDate,
      street: user.street || '',
      zipCode: user.zipCode || '',
      city: user.city || '',
      notes: user.notes || '',
    };
  }

  ngOnDestroy() {
    this.unsubUsers();
  }
}
