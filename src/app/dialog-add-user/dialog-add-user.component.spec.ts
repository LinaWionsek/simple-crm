import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserComponent } from './dialog-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;
  
  const mockDataService = {
    addUser: jasmine.createSpy('addUser').and.returnValue(Promise.resolve())
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUserComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: DataService, useValue: mockDataService }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
