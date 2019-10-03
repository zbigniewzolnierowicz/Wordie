import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbListModule,
  NbActionsModule,
  NbSidebarModule,
  NbMenuModule
} from '@nebular/theme';
import {
  NbEvaIconsModule
} from '@nebular/eva-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({
      name: 'default'
    }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbListModule,
    NbActionsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
