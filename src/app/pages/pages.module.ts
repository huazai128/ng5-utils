import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@theme/theme.module';
import { ComponentModule } from '@component/component.module';
import { routing } from './pages.routing';

import { PagesComponent } from './pages.component';

@NgModule({
  imports:[
    CommonModule,
    ThemeModule,
    ComponentModule,
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
