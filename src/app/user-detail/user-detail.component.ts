import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string = '';
  firestore: Firestore = inject(Firestore);
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



  
}
