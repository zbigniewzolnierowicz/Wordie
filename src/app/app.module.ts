// tslint:disable: max-line-length
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbActionsModule, NbCardModule, NbContextMenuModule, NbGlobalPhysicalPosition, NbLayoutModule, NbListModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrModule, NbUserModule } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StorageServiceModule } from 'angular-webstorage-service';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { metaReducers, reducers } from './reducers';

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
    NbMenuModule.forRoot(),
    StorageServiceModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NbToastrModule.forRoot({ destroyByClick: true, position: NbGlobalPhysicalPosition.BOTTOM_RIGHT }),
    NbUserModule,
    NbContextMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
