import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetAmountPage } from './set-amount.page';

const routes: Routes = [
  {
    path: '',
    component: SetAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetAmountPageRoutingModule {}
