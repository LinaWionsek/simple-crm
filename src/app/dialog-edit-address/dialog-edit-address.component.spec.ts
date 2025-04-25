import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAddressComponent } from './dialog-edit-address.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: ComponentFixture<DialogEditAddressComponent>;


  const mockDataService = {
    updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve()),
    user: {}  // falls du später auf `data.user = { ... }` testest
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditAddressComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
      
        { provide: DataService, useValue: mockDataService }
     ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
 // Testdaten setzen
    component.user = {
      firstName: 'Max',
      lastName: 'Muster',
      email: 'max@test.de',
      city: 'Berlin',
      zipCode: '12345',
      street: 'Straße 1',
      birthDate: new Date(),
      notes: '',
    };
    component.userId = 'abc123';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
