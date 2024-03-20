import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Amount, AmountService, Expense } from 'src/app/services/amount.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
})
export class ExpenseListPage implements OnInit {
  todo: Expense = {
    expenseAmount: '',
    expenseName: '',
    fixAmountId: ''
  };
  todos: any;
  public expense: Observable<Expense[]> | any;  
  public amount: Observable<Amount[]> | any;  
  selectedValue: any;
  constructor(private amountService: AmountService, private route: Router,) { }

  ngOnInit() {
    this.expense= this.amountService.getExpense()
   console.log(this.expense,'checks')


   this.amount= this.amountService.getSetAmount()
   console.log(this.amount,'checks1')

   
  }

  removeFilter(){
    this.expense= this.amountService.getExpense()
    console.log(this.expense,'checks')
 
 
    this.amount= this.amountService.getSetAmount()
    console.log(this.amount,'checks1')
 
  }
 

  goToEdit(id:any){
    console.log(id,'id checks000')
    // this.router.navigate(["/details/"])
    this.route.navigate(["/set-amount/"],{
      queryParams:{
        id: id
      }
    });
      }

      filterAmount(event: any){
         this.selectedValue = event.detail.value;
         this.amountService.getExpenseByFixAmountId(this.selectedValue).subscribe((expenses: Expense[]) => {
          this.expense =of(expenses) ;
          console.log(this.expense, 'expenses checks######33');
        });
   
        console.log(this.selectedValue,'value checks')
      
      }

}
