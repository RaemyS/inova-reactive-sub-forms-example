import { Routes } from '@angular/router';
import {MyFancyFormRootComponent} from './my-fany-form-root/my-fancy-form-root.component';

export const routes: Routes = [
  { path: 'form', component: MyFancyFormRootComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' }
];
