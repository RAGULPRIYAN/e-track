import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'set-amount',
        loadChildren: () => import('../set-amount/set-amount.module').then( m => m.SetAmountPageModule)
      },
      {
        path: 'expense-list',
        loadChildren: () => import('../expense/expense-list/expense-list.module').then( m => m.ExpenseListPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
