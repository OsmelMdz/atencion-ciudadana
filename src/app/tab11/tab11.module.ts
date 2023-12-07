import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab11PageRoutingModule } from './tab11-routing.module';

import { Tab11Page } from './tab11.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab11PageRoutingModule
  ],
  declarations: [Tab11Page]
})
export class Tab11PageModule {}
