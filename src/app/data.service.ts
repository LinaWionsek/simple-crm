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
  birthDate!: Date;

  allUsers: User[] = [];
  loading = false;
  user = {} as UserInterface;
  unsubUsers;
  currentUserID: string  | undefined = '';

  firestore: Firestore = inject(Firestore);

  unsubUserList() {
    return onSnapshot(collection(this.firestore, 'users'), (list) => {
      this.allUsers = []; // empty the array before adding new items
      list.forEach((element) => {
        let receivedData = new User(element.data(), element.id);
        // console.log(element.id)
        if (receivedData) {
          this.allUsers.push(receivedData);
        }
      });
      // console.log(this.allUsers);
    });
  }

  async addUser(user: UserInterface) {
    this.loading = true;
    await addDoc(this.getUsersRef(), user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        this.currentUserID = docRef?.id;
        console.log('Current User ID: ', this.currentUserID);
      
        // this.loading = false;
      });
  }

  unsubSinlgeUser(id: string) {
    // this.getUserId();
    return onSnapshot(doc(this.getUsersRef(), id), (element) => {
      console.log(element.data());
      this.user = element.data() as UserInterface;
      this.handleBirthDate();
    });
  }

  handleBirthDate() {
    // Log the current value and type of birthDate
    console.log('BirthDate before conversion:', this.user.birthDate);
    console.log('Type of BirthDate:', typeof this.user.birthDate);
    // Proceed if birthDate is defined
    if (this.user.birthDate) {
      // Attempt to create a Date object
      const date = new Date(this.user.birthDate);

      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        // Valid date
        this.user.birthDate = date;

        // Format the date for display
        this.user.formattedBirthDate = date.toLocaleDateString('en-US');

        console.log(
          'BirthDate after conversion:',
          this.user.formattedBirthDate
        );
      } else {
        // Invalid date
        console.error('Invalid Date:', this.user.birthDate);
        // Handle the invalid date case as needed
        this.user.birthDate = null; // or any default value
      }
    } else {
      console.warn('BirthDate is undefined or null');
      // Handle the undefined birthDate case as needed
      this.user.birthDate = null; // or any default value
    }
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  async updateUser(docId: string) {
    this.handleBirthDate();
    this.birthDate.getTime();
    this.user.birthDate = this.birthDate
      ? this.birthDate.getTime()
      : this.user.birthDate;
    this.loading = true;
    await updateDoc(this.getSingleDocRef(docId), this.getCleanJson(this.user))
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        this.loading = false;
        // this.dialogRef.close();
      });
  }

  getSingleDocRef(docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }
  getCleanJson(user: UserInterface) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: this.birthDate.getTime(),
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
      notes: user.notes,
    };
  }
  ngOnDestroy() {
    this.unsubUsers();
  }
}
