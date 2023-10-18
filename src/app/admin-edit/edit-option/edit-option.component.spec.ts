import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOptionComponent } from './edit-option.component';

describe('EditOptionComponent', () => {
  let component: EditOptionComponent;
  let fixture: ComponentFixture<EditOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOptionComponent]
    });
    fixture = TestBed.createComponent(EditOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
