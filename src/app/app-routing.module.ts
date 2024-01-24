import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    canActivate: [authGuard],
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((module) => module.HomeModule),
  },
  {
    canActivate: [authGuard],
    path: 'movie/:id',
    loadChildren: () =>
      import('./features/details/details.module').then((module) => module.DetailsModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
