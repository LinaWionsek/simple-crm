import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProductComponent } from './dialog-add-product.component';
import { MatDialogRef } from '@angular/material/dialog';

import { Firestore } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('DialogAddProductComponent', () => {
  let component: DialogAddProductComponent;
  let fixture: ComponentFixture<DialogAddProductComponent>;

  const mockFirestore = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddProductComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },

        { provide: Firestore, useValue: mockFirestore }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
