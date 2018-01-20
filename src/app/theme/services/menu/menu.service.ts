import { Injectable, Inject, Optional, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; //发送最近一次数据
import { share } from 'rxjs/operators'; // 转成Subject类型，可以一对多推送
import { AclService } from '@acl';
import { I18nService,I18N_TOKEN } from '../i18n/i18n.service';

export interface Menu {
  // 文本
  text: string;
  // i18n主键
  i18n?: string;
  // 是否为菜单组
  group?: boolean;
  // 路由
  link?: string;
  // 外部链接
  externalLink?: string;
  // 链接 target
  target?: '_blank' | '_self' | '_parent' | '_top';
  // 图标
  icon?: string;
  //  徽标数，展示的数字
  badge?: number;
  /** 徽标数，显示小红点 */
  badge_dot?: boolean;
  // 徽标数，设置 Badge 颜色
  badge_status?: string;
  // 是否隐藏
  hide?: boolean;
  // acl配置 若导入 @delon/acl 时自动有效
  acl?: any;
  // 是否显示快捷菜单项
  shortcut?: boolean;
  // 是否显示快捷菜单项
  shortcut_root?: boolean;
  // 是否允许服用，需配合 `reuse-tab` 组件
  reuse?: boolean;
  // 二级菜单
  children?: Menu[];
  /**
   * 菜单类型，无须指定由 Service 自动识别
   * 1：链接
   * 2：外部链接
   * 3：链接（子菜单）
   * @private
   */
  _type?: number;
  /**
   * 是否选中
   * @private
   */
  _selected?: boolean;
  /**
   * 是否隐藏菜单
   * @private
   */
  _hidden?: boolean;
  /**
   * 是否打开
   * @private
   */
  _open?: boolean;
  /**
   * @private
   */
  _depth?: number;

  [key: string]: any;
}

@Injectable()
export class MenuService implements OnDestroy{

  private _changes$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);
  private menus: Menu[] = [];

  constructor(
    @Optional() @Inject(I18N_TOKEN) private i18nService:I18nService,
    @Optional() private alcService:AclService
  ) { }

  get change():Observable<Menu[]>{
    return this._changes$.pipe(share()); // 把Observable转成Subject对象
  }

  // 获取路由数据
  public add(items:Menu[]){
    this.menus = [...items];
    this.resetRouter(); //  重置路由
  }

  public visit(callback?:(item: Menu, parentMenum: Menu, depth?: number) => void){
    const inFn = (lists:Menu[],parentMenu:Menu,depth:number) => {
      for(const item of lists){
        callback(item,parentMenu,depth);
        if(item.children && item.children.length > 0){
          inFn(item.children,item,depth+1);
        }else{
          item.children = [];
        }
      }
    }
    inFn(this.menus,null,0);
  }

  // 重置路由
  public resetRouter(callback?:(item:Menu,parentMenu:Menu,depth?:number) => void) {
    let i = 1;
    this.removeShortcut();
    const shortcuts:Menu[] = []; // 存储快捷菜单数据
    this.visit((item,parentMenu,depth) => {
      item.__id = i++;
      item.__parent = parentMenu;
      item._depth = depth;
      if(!item.link) item.link = '';
      if(!item.externalLink) item.externalLink = '';
      if(item.badge){
        if(!item.badge_dot){
          item.badge_dot = false;
        }
        if(!item.badge_status){
          item.badge_status = 'error';
        }
      }
      item._type = item.externalLink ? 2 : 1;
      if (item.children && item.children.length > 0) {
        item._type = 3;
      }
      // 快捷菜单
      if(item.shortcut === true && (item.link ||  item.externalLink)){
        shortcuts.push(item);
      }
      const i18n = item.i18n || item.translate;
      item.text = this.i18nService && i18n ? this.i18nService.fanyi(i18n) : item.text;
      item._hidden = typeof item.hide === 'undefined' ? false : item.hide;

      // 权限控制
      if(item.acl && this.alcService){
        item._hidden = !this.alcService.can(item.acl);
      }
      if (callback) callback(item, parentMenu, depth);
    });
    this.loadShortcut(shortcuts);
    this._changes$.next(this.menus);
  }
  // 删除快捷菜单
  private removeShortcut(){
    // 获取第一个子路由
    const ls = this.menus && this.menus.length && this.menus[0].children || [];
    const pos = ls.findIndex((item) => (item.shortcut_root === true));
    if(pos !== -1) ls.splice(pos,1); // 删除pos数据
  }

  // 加载快捷菜单
  private loadShortcut(shortcuts:Menu[]){
    if(!shortcuts.length || !this.menus.length) return false;
    const ls = this.menus[0].children || [];
    let pos  =  ls.findIndex((item) => Object.is(item.shortcut_root,true));
    if(pos === -1){
      pos = ls.findIndex(w => w.link.includes('dashboard') || w.externalLink.includes('dashboard'));
      pos = (pos !== -1 ? pos : -1) + 1;
      this.menus[0].children.splice(pos, 0, {
        text: '快捷菜单',
        translate: 'shortcut',
        icon: 'icon-rocket',
        children: []
      });
    }
    let _data = this.menus[0].children[pos];
    _data = Object.assign(_data, {
      shortcut_root: true,
      _type: 3,
      __id: -1,
      _depth: 1
    });
    _data.children = shortcuts.map(i => {
      i._depth = 2;
      return i;
    });
  }

  // 根据URL设置菜单`open`属性
  openedByUrl(url:string){
    if(!url) return false;
    let findItem:Menu = null;
    this.visit((item) => {
      item._open = false;
      if(!item.link){
        return false;
      }
      if(!findItem && url.startsWith(item.link)){ // startsWith用于检查string字符串开始数据
        findItem = item;
      }
    })
    if(!findItem){
      console.warn(`not found page name:${url}`);
      return false;
    }
    do {
      findItem._open = true;
      findItem = findItem.__parent;
    } while (findItem);
  }

  ngOnDestroy(){

  }
}
