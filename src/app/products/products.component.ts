import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Product } from '../models/product.class';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

import { RouterModule } from '@angular/router';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatIconModule, MatButtonModule, MatTooltipModule,MatDialogModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  readonly dialog = inject(MatDialog);

  product = new Product();
  allProducts: Product[] = [];
 
  
  unsubProducts;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubProducts = this.unsubProductList();
  }

  unsubProductList() {
    return onSnapshot(collection(this.firestore, 'products'), (list) => {
      this.allProducts = []; // empty the array before adding new items
      list.forEach((element) => {
        let receivedData = new Product(element.data(), element.id);
        console.log(element.id)
        if(receivedData) {
          this.allProducts.push(receivedData);
        }
      });
      console.log(this.allProducts);
    });
  }

  ngOnDestroy() {
    this.unsubProducts();
  }

  openDialog() {
    this.dialog.open(DialogAddProductComponent);
  }
}
