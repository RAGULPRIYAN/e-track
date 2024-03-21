import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseListPageRoutingModule } from './expense-list-routing.module';

import { ExpenseListPage } from './expense-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseListPageRoutingModule,DatePipe
  ],
  declarations: [ExpenseListPage],
  providers: [DatePipe],
})
export class ExpenseListPageModule {}
