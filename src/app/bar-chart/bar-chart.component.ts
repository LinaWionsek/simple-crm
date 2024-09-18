import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { User } from '../models/user.class';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Product } from '../models/product.class';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  public chart: any;
  user = new User();
  product = new Product();
  allUsers: User[] = [];
  allProducts: Product[] = [];
  firestore: Firestore = inject(Firestore);
  unsubAll;

  constructor() {
    this.unsubAll = this.unsubUserAndProductList();
  }

  unsubUserAndProductList() {
    const unsubUsers = onSnapshot(
      collection(this.firestore, 'users'),
      (list) => {
        this.allUsers = []; // empty the array before adding new items
        list.forEach((element) => {
          let receivedData = new User(element.data(), element.id);
          if (receivedData) {
            this.allUsers.push(receivedData);
          }
        });
      }
    );
    const unsubProducts = onSnapshot(
      collection(this.firestore, 'products'),
      (list) => {
        this.allProducts = []; // empty the array before adding new items
        list.forEach((element) => {
          let receivedProductData = new Product(element.data(), element.id);
          if (receivedProductData) {
            this.allProducts.push(receivedProductData);
          }
        });
        this.createChart();
      }
    );
    // this.createChart();
    return () => {
      unsubUsers();
      unsubProducts();
    };
  }

  createChart() {
    console.log(this.allUsers);
    console.log(this.allProducts);
    console.log('Users:', this.allUsers.length);
    console.log('Products:', this.allProducts.length);
    this.chart = new Chart('MyChart', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: [''],
        datasets: [
          {
            label: 'Users',
            data: [this.allUsers.length],
            backgroundColor: 'blue',
          },
          {
            label: 'Products',
            data: [this.allProducts.length],
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
