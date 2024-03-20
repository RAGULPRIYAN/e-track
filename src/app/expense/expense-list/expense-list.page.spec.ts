import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseListPage } from './expense-list.page';

describe('ExpenseListPage', () => {
  let component: ExpenseListPage;
  let fixture: ComponentFixture<ExpenseListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExpenseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
