import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  const mockDataService = {
    addUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve())
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent, NoopAnimationsModule],
      providers: [
                    {
                      provide: MatDialogRef,
                      useValue: {}
                    },
                    { provide: DataService, useValue: mockDataService }
                 ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;

    // 🔧 WICHTIG: user setzen, bevor detectChanges() aufgerufen wird
    component.user = {
      firstName: 'Max',
      lastName: 'Muster',
      email: 'max@example.com',
      city: 'Berlin',
      street: 'Straße 1',
      zipCode: '12345',
      birthDate: new Date(),
      notes: ''
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
