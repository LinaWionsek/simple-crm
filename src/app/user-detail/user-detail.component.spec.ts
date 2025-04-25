import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { RouterModule } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { DataService } from '../data.service';
describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  const mockFirestore = {};
  const mockDataService = {
    // falls nötig
    updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve()),
    unsubSinlgeUser: jasmine.createSpy('unsubSinlgeUser').and.returnValue(() => {}),
    user: {}
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailComponent, RouterModule.forRoot([])],
      providers: [{ provide: Firestore, useValue: mockFirestore },
      { provide: DataService, useValue: mockDataService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
