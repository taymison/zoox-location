import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LinkComponent } from './components/link/link.component';
import { CityComponent } from './pages/city/city.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StateComponent } from './pages/state/state.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StateComponent,
    LinkComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
