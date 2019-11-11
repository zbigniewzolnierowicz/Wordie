import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'cards',
    canActivate: [LoginGuard],
    loadChildren: () => import('./modules/cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard, LoginGuard],
    loadChildren: () => import('./modules/admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
