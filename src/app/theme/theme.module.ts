import { NgModule,ModuleWithProviders,InjectionToken,Optional,SkipSelf,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { THEME_OPTIONS,ThemeOptions } from './theme.options';

import { ScrollService } from '@theme/services/scroll/scroll.service';
import { ThemeService } from '@theme/services/themes/themes.service';
import { SettingService } from '@theme/services/setting/setting.service';
import { MenuService } from '@theme/services/menu/menu.service';

const NG_SERVICE = [
  ScrollService,
  ThemeService,
  SettingService,
  MenuService
]

@NgModule({
  imports:[

  ],
  declarations:[

  ],
  providers:[

  ],
})

export class ThemeModule{
  static forRoot(options?:ThemeOptions):ModuleWithProviders{
    return {
      ngModule:ThemeModule,
      providers:[
        ...NG_SERVICE,
        { provide:THEME_OPTIONS,useValue:options || {} }  // 非类依赖注入
      ]
    }
  }
  static forChild():ModuleWithProviders{
    return {
      ngModule:ThemeModule,
      providers:[
        ...NG_SERVICE
      ]
    }
  }
}
