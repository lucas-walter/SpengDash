import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TermineComponent } from './termine/termine.component';
import { StundenplanComponent } from './stundenplan/stundenplan.component';
import { RaumplanerComponent } from './raumplaner/raumplaner.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TermineComponent,
    StundenplanComponent,
    RaumplanerComponent,
    ImpressumComponent,
    DatenschutzComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'login', component: LoginComponent},
      {path:'termine', component: TermineComponent},
      {path:'stundenplan', component: StundenplanComponent},
      {path:'raumplaner', component: RaumplanerComponent},
      {path:'impressum', component: ImpressumComponent},
      {path:'datenschutz', component: DatenschutzComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
