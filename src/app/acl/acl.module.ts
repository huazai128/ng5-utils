import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AclService } from './service/acl.service';

const NG_SERVICES = [
  AclService,
]

@NgModule({
  imports:[
    CommonModule,
  ]
})

export class AclModule{
  static forRoot():ModuleWithProviders{
    return {
      ngModule:AclModule,
      providers:[
        ...NG_SERVICES
      ]
    }
  }
}
