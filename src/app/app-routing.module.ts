import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./registration/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
 
  {
    path: 'signup',
    loadChildren: () => import('./registration/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'set-amount',
    loadChildren: () => import('./set-amount/set-amount.module').then( m => m.SetAmountPageModule)
  },
  {
    path: 'expense-list',
    loadChildren: () => import('./expense/expense-list/expense-list.module').then( m => m.ExpenseListPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
