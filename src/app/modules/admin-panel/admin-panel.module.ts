import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { CardAdminComponent } from './components/card-admin/card-admin.component';


@NgModule({
  declarations: [AdminPanelComponent, CardAdminComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule
  ]
})
export class AdminPanelModule { }
