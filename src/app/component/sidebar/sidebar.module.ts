import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd';

import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports:[
    CommonModule,
    NzToolTipModule,
    RouterModule
  ],
  declarations:[
    SidebarComponent
  ],
  exports:[
    SidebarComponent
  ]
})
export class SidebarModule{
  static forRoot():ModuleWithProviders{
    return {
      ngModule:SidebarModule,
      providers:[]
    }
  }
}
