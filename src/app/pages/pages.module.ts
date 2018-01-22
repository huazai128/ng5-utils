import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@theme/theme.module';
import { SidebarModule } from '@component/index';
import { routing } from './pages.routing';

import { PagesComponent } from './pages.component';

@NgModule({
  imports:[
    CommonModule,
    ThemeModule,
    SidebarModule,
    routing
  ],
  declarations:[
    PagesComponent
  ],
  providers:[

  ]
})

export class PagesModule{

}
