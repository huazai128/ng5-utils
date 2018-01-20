import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@theme/theme.module';
import { RouterModule } from '@angular/router';


import { SidebarComponent } from './sidebar/sidebar.component';

const NG_COMPONENTS = [
  SidebarComponent
]

@NgModule({
  imports:[
    CommonModule,
    RouterModule,
    ThemeModule,
  ],
  declarations:[
    ...NG_COMPONENTS
  ],
  exports:[
    ...NG_COMPONENTS
  ]
})
export class ComponentModule{

}
