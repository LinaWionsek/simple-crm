import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUsernoteComponent } from './dialog-add-usernote.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Firestore } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogAddUsernoteComponent', () => {
  let component: DialogAddUsernoteComponent;
  let fixture: ComponentFixture<DialogAddUsernoteComponent>;

  const mockDataService = {
    addUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve()),
    user: {}
  }

  const mockFirestore = {};
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUsernoteComponent, MatDialogModule, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: DataService, useValue: mockDataService },
        { provide: Firestore, useValue: mockFirestore }
     ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddUsernoteComponent);
    component = fixture.componentInstance;

  // Beispielwerte setzen, falls gebraucht
  component.user = {
    firstName: 'Anna',
    lastName: 'Muster',
    email: 'anna@example.com',
    city: 'Hamburg',
    street: 'Beispielstraße 5',
    zipCode: '12345',
    birthDate: new Date(),
    notes: 'Testnote'
  };

  component.userId = 'abc123';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
