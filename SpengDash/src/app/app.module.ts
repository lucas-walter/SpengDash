import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TermineComponent } from './termine/termine.component';
import { StundenplanComponent } from './stundenplan/stundenplan.component';
import { RaumplanerComponent } from './raumplaner/raumplaner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TermineComponent,
    StundenplanComponent,
    RaumplanerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'login', component: LoginComponent},
      {path:'termine', component: TermineComponent},
      {path:'stundenplan', component: StundenplanComponent},
      {path:'raumplaner', component: RaumplanerComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
