import { NgModule,ModuleWithProviders } from '@angular/core';

import { SidebarModule } from './sidebar/sidebar.module';

export * from './sidebar';

const MODULES = [
  SidebarModule
]

@NgModule({
  imports:[
    SidebarModule.forRoot(),

  ],
  exports:[...MODULES]
})

export class AlineRootModule{}


@NgModule({
  exports:[...MODULES]
})
export class AlineModule{
  static forRoot():ModuleWithProviders{
    return {
      ngModule:AlineModule,
      providers:[]
    }
  }
}
