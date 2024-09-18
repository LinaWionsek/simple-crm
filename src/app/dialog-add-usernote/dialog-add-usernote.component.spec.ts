import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUsernoteComponent } from './dialog-add-usernote.component';

describe('DialogAddUsernoteComponent', () => {
  let component: DialogAddUsernoteComponent;
  let fixture: ComponentFixture<DialogAddUsernoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUsernoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddUsernoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
