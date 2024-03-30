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
    fixAmountId: '',
    timestamp: new Date()
  };
  public amount: Observable<Amount[]> | any;
  amounts: any
  expenseAmount: any
  expenseName: any
  amountValue: Observable<any[]> | any
  fixAmountId: any
  todos: any;
  remainingAmount:number=0
  constructor(private activeRoute: ActivatedRoute, private amountService: AmountService, private route: Router, private modalController: ModalController) { }

  ngOnInit() {
    this.amount = this.amountService.getSetAmount()
  
    const id: any = this.activeRoute.snapshot.queryParams["id"];;
  console.log(id,"id ###")
    if (id) {
 
      this.amountService.getExpenseId(id).subscribe(todo => {
        this.todo = todo!;
       
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
      this.route.navigate(['home/expense-list'])
    },
      err => {

      })
  }

  updateExpense() {
    this.amountService.updateExpense(this.todo).then(() => {
      this.route.navigateByUrl('home/expense-list');

    }, err => {

    });
  }

  cancelExpense() {
    this.route.navigate(['home/expense-list'])
  }



setRemainingAmount(event: any) {
  const selectedValue = event.detail.value;

  // Fetch fixAmount
  this.amountService.getSetAmountId(selectedValue).subscribe(todo => {
    const fixAmount:any = todo?.setAmount;
  

    // Fetch totalExpenseAmount
    this.amountService.getExpenseByFixAmountId(selectedValue).subscribe((expenses: Expense[]) => {
      this.todos = expenses;
     
      const totalExpenseAmount = this.todos.reduce((total: number, e: { expenseAmount: string; }) => total + parseFloat(e.expenseAmount), 0);
      console.log(totalExpenseAmount, 'total expense amount');

      // Calculate remainingAmount
    this.remainingAmount = parseFloat(fixAmount) - totalExpenseAmount;
    // console.log(this.remainingAmount,'remaining amount')
 
   
    });
  });


}

}