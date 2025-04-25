import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { DataService } from '../data.service';
import { RouterModule } from '@angular/router';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  const mockDataService = {
    allUsers: [
      {
        id: '1',
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max@example.com',
        city: 'Berlin',
        birthDate: new Date(),
        formattedBirthDate: '01/01/2020',
        street: 'Teststraße 1',
        zipCode: '12345',
        notes: 'Testnote'
      }
    ],
    user: {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent, RouterModule.forRoot([])],
      providers: [ { provide: DataService, useValue: mockDataService } ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
