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
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './start/start.component';
import { FaqComponent } from './faq/faq.component';
import { DsgvoComponent } from './dsgvo/dsgvo.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { PwaOfflineComponent } from './pwa-offline/pwa-offline.component';
import { ServiceWorkerModule } from  '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TermineComponent,
    StundenplanComponent,
    RaumplanerComponent,
    ImpressumComponent,
    DatenschutzComponent,
    NotFoundComponent,
    StartComponent,
    FaqComponent,
    DsgvoComponent,
    SettingsComponent,
    SignupComponent,
    PwaOfflineComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path:'', component: StartComponent},
      {path:'login', component: LoginComponent},
      {path:'termine', component: TermineComponent},
      {path:'stundenplan', component: StundenplanComponent},
      {path:'raumplaner', component: RaumplanerComponent},
      {path:'impressum', component: ImpressumComponent},
      {path:'datenschutz', component: DatenschutzComponent},
      {path:'faq', component: FaqComponent},
      {path:'dsgvo', component: DsgvoComponent},
      {path:'settings', component: SettingsComponent},
      {path:'signup', component: SignupComponent},
      {path:'dashboard', component: DashboardComponent},
      {path: '**', component: NotFoundComponent }
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
