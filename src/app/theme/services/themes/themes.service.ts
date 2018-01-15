import { Injectable,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; // DOCUMENT 是InjectToken
import { SettingService } from '../setting/setting.service';

export type ThemeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J';

@Injectable()
export class ThemeService{
  styleTag:any;
  defaultTheme:ThemeType = 'A'; // 默认主题\

  constructor(private set:SettingService,@Inject(DOCUMENT) private doc:any){}

}
