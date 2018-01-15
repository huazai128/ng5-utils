import { RouterModule,Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes:Routes = [
  {
    path:'',
    component:PagesComponent,
    // children:[]
  }
]

export const routing = RouterModule.forRoot(routes,{useHash:false})
