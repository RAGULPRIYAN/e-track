import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetAmountPage } from './set-amount.page';

describe('SetAmountPage', () => {
  let component: SetAmountPage;
  let fixture: ComponentFixture<SetAmountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SetAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
