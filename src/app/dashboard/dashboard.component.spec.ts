import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Firestore } from '@angular/fire/firestore';
import { BarChartComponent } from '../bar-chart/bar-chart.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;


  const mockFirestore = {};

  beforeEach(() => {
    spyOn(BarChartComponent.prototype, 'unsubUserAndProductList').and.returnValue(() => {});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent], 
      providers: [{ provide: Firestore, useValue: mockFirestore }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
