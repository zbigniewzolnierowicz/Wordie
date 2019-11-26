import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserPanelComponent } from './user-panel.component';
import { NbListModule, NbCardModule, NbLayoutModule, NbActionsModule, NbPopoverModule } from '@nebular/theme';
import { UserPanelCardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    UserPanelComponent,
    UserPanelCardComponent
  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    NbListModule,
    NbCardModule,
    NbLayoutModule,
    NbActionsModule,
    NbPopoverModule
  ]
})
export class UserPanelModule { }
