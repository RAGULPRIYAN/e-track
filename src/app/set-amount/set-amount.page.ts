import { Component, OnInit } from '@angular/core';
import { AmountService, Amount, Expense } from '../services/amount.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-set-amount',
  templateUrl: './set-amount.page.html',
  styleUrls: ['./set-amount.page.scss'],
})
export class SetAmountPage implements OnInit {

  todo: Expense = {
    expenseAmount: '',
    expenseName: '',
    fixAmountId: ''
  };
  public amount: Observable<Amount[]> | any;
  amounts: any
  expenseAmount: any
  expenseName: any
  amountValue: Observable<any[]> | any
  fixAmountId: any
  todos: any;
  remainingAmount:any
  constructor(private activeRoute: ActivatedRoute, private amountService: AmountService, private route: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.amount = this.amountService.getSetAmount()
    console.log(this.amount, 'checks')

    const id: any = this.activeRoute.snapshot.queryParams["id"];;
    console.log(id, 'id checks')
    if (id) {
      console.log(id, 'inside if checks')
      this.amountService.getExpenseId(id).subscribe(todo => {
        this.todo = todo!;
        console.log(this.todo, ' this.todo')
      });
    }
  }

  addAmount() {
    let payload = {
      setAmount: this.amounts
    }
    this.amountService.createSetAmount(payload).then(() => {
      this.modalController.dismiss();
      // this.route.navigateByUrl('/set-amount');
      // this.showToast('todo added');  
    }, err => {
      // this.showToast('There was a some problem in adding your todo :(');  
    });
  }

  createExpense() {
    // let payload={
    //   expenseAmount:this.expenseAmount,
    //   expenseName:this.expenseName,
    //   fixAmountId:this.fixAmountId

    // }
    // console.log(payload,'payload checks')
    this.amountService.createExpense(this.todo).then(() => {
      this.route.navigate(['/expense-list'])
    },
      err => {

      })
  }

  updateExpense() {
    this.amountService.updateExpense(this.todo).then(() => {
      this.route.navigateByUrl('/expense-list');

    }, err => {

    });
  }

  cancelExpense() {
    this.route.navigate(['/expense-list'])
  }

//   remainingAmount(amount:any) {
// let fixAmount = amount;
// // console.log(fixAmount,'amount checks')
//   }

setRemainingAmount(event: any) {
  const selectedValue = event.detail.value;

  // Fetch fixAmount
  this.amountService.getSetAmountId(selectedValue).subscribe(todo => {
    const fixAmount:any = todo?.setAmount;
    console.log(fixAmount, 'fixAmount checks');

    // Fetch totalExpenseAmount
    this.amountService.getExpenseByFixAmountId(selectedValue).subscribe((expenses: Expense[]) => {
      this.todos = expenses;
      console.log(this.todos, 'expenses checks');

      const totalExpenseAmount = this.todos.reduce((total: number, e: { expenseAmount: string; }) => total + parseFloat(e.expenseAmount), 0);
      console.log(totalExpenseAmount, 'total expense amount');

      // Calculate remainingAmount
    this.remainingAmount = parseFloat(fixAmount) - totalExpenseAmount;
      console.log(this.remainingAmount, 'remaining amount');
      
      // Use remainingAmount as needed in your application
    });
  });


}

}