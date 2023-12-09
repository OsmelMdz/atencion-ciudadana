import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { Tab8PageRoutingModule } from './tab8-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab8Page } from './tab8.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Tab8PageRoutingModule
  ],
  declarations: [Tab8Page],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab8PageModule {}
