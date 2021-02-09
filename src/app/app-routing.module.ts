import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './pages/city/city.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StateComponent } from './pages/state/state.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'state/:stateId',
    component: StateComponent
  },
  {
    path: 'city/:cityId',
    component: CityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
