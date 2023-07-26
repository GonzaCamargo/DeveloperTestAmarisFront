import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationComponent } from './Pages/information/information.component';

const routes: Routes = [
  {
    path:"employees",
    component: InformationComponent
  },
  {
    path:"",
    component: InformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
