import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDailogComponent } from './add-edit-dailog.component';

describe('AddEditDailogComponent', () => {
  let component: AddEditDailogComponent;
  let fixture: ComponentFixture<AddEditDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditDailogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
