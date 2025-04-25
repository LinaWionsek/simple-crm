import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;


  const mockFirestore = {};
  const mockDialog = {
    open: jasmine.createSpy('open')
  };

  beforeEach(() => {
    // Methode, die Firestore aufruft, einfach faken:
    spyOn(ProductsComponent.prototype, 'unsubProductList').and.returnValue(() => {});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [{ provide: Firestore, useValue: mockFirestore },
      { provide: MatDialog, useValue: mockDialog }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
