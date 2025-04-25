import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Firestore } from '@angular/fire/firestore';


describe('DataService', () => {
  let service: DataService;
  const mockFirestore = {};
  
  beforeEach(() => {

    spyOn(DataService.prototype, 'unsubUserList').and.returnValue(() => {});
    
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: mockFirestore }
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
