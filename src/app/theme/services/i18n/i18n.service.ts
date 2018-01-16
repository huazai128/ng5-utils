import { Injectable,InjectionToken } from '@angular/core';

export interface I18nServiceType {
  [key:string]:any;
  use(lang:string,firstLoad:boolean):void;
  getLangs():any[];
  fanyi(key:string):any;
}

export const I18N_TOKEN =  new InjectionToken<I18nServiceType>('I18N_TOKEN');

@Injectable()
export class I18nService implements I18nServiceType{
  use(lang:string,firstLoad:boolean):void{

  }
  getLangs():any[]{
    return []
  }
  fanyi(key:string):any{
    return key;
  }
}
