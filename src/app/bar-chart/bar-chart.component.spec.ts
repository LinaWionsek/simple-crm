import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';
import { Firestore } from '@angular/fire/firestore';
describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  const mockFirestore = {};
  
  beforeEach(() => {
    spyOn<any>(BarChartComponent.prototype, 'unsubUserAndProductList').and.returnValue(() => {});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartComponent], 
      providers: [{ provide: Firestore, useValue: mockFirestore }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
