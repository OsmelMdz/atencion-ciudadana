import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab12Page } from './tab12.page';

const routes: Routes = [
  {
    path: '',
    component: Tab12Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab12PageRoutingModule {}
