import { Injectable, Inject, Optional, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; //发送最近一次数据
import { share } from 'rxjs/operators'; // 转成Subject类型，可以一对多推送
import { AclService } from '@acl';
import { I18nService,I18N_TOKEN } from '@theme';

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
    @Optional() private alService:AclService
  ) { }

  // 获取路由数据
  public add(items:Menu[]){
    this.menus = [...items];
    console.log(this.menus);
  }

  // 重置路由
  public resetRouter() {

  }

  ngOnDestroy(){

  }
}
