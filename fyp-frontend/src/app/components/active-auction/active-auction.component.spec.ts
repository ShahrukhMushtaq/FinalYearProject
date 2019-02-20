import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAuctionComponent } from './active-auction.component';

describe('ActiveAuctionComponent', () => {
  let component: ActiveAuctionComponent;
  let fixture: ComponentFixture<ActiveAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
