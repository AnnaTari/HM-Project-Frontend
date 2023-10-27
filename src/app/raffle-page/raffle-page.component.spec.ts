import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RafflePageComponent } from './raffle-page.component';

describe('RafflePageComponent', () => {
  let component: RafflePageComponent;
  let fixture: ComponentFixture<RafflePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RafflePageComponent]
    });
    fixture = TestBed.createComponent(RafflePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
