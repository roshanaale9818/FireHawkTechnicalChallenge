import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'cars',
    loadChildren: () => import('./car/car.module').then((m) => m.CarModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
