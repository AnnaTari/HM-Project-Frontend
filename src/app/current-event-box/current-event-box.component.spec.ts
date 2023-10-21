import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventBoxComponent } from './current-event-box.component';

describe('CurrentEventBoxComponent', () => {
  let component: CurrentEventBoxComponent;
  let fixture: ComponentFixture<CurrentEventBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentEventBoxComponent]
    });
    fixture = TestBed.createComponent(CurrentEventBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
