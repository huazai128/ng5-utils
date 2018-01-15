import { InjectionToken } from '@angular/core';

export interface ThemeOptions{
  [key:string]:any;
  SERVER_URL:string;
}

export const THEME_OPTIONS = new InjectionToken<ThemeOptions>('THEME_OPTIONS'); // 非类注入


