import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetAmountPageRoutingModule } from './set-amount-routing.module';

import { SetAmountPage } from './set-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetAmountPageRoutingModule
  ],
  declarations: [SetAmountPage]
})
export class SetAmountPageModule {}
