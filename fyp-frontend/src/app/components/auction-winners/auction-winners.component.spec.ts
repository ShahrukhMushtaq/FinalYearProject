import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionWinnersComponent } from './auction-winners.component';

describe('AuctionWinnersComponent', () => {
  let component: AuctionWinnersComponent;
  let fixture: ComponentFixture<AuctionWinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionWinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
