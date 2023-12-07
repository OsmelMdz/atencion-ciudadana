import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab12PageRoutingModule } from './tab12-routing.module';

import { Tab12Page } from './tab12.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab12PageRoutingModule
  ],
  declarations: [Tab12Page]
})
export class Tab12PageModule {}
