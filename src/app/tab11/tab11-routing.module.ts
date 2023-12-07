import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab11Page } from './tab11.page';

const routes: Routes = [
  {
    path: '',
    component: Tab11Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab11PageRoutingModule {}
