import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonModalComponent } from './edit-person-modal.component';

describe('EditPersonModalComponent', () => {
  let component: EditPersonModalComponent;
  let fixture: ComponentFixture<EditPersonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
