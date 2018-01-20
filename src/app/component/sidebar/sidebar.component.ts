import { Component,ElementRef,Renderer2,Inject,OnInit,OnDestroy,HostListener,ChangeDetectionStrategy,ChangeDetectorRef, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { MenuService,SettingService,Menu } from '@theme';

const SHOWCLS = 'nav-floating-show';
const FLOATINGCLS = 'nav-floating';

@Component({
  selector:"app-sidebar",
  templateUrl:'./sidebar.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  preserveWhitespaces:false
})

export class SidebarComponent implements OnInit,OnDestroy{

  private rootEl:HTMLDivElement;
  private floatingEl:HTMLDivElement;
  private bodyEl:HTMLBodyElement;

  public lists:Menu[]; // 路由集合
  public _change$:Subscription;

  constructor(
    private menuSer:MenuService,
    private settingSer:SettingService,
    private router:Router,
    private el:ElementRef, // 元素属性操作
    private render:Renderer2, // DEMO操作
    @Inject(DOCUMENT) private doc:any,
  ){
    this.rootEl = el.nativeElement as HTMLDivElement;
  }
  ngOnInit(){
    this.bodyEl = this.doc.querySelector('body');
    this.menuSer.openedByUrl(this.router.url);// 传递当前路由路径
    this._change$ = this.menuSer.change.subscribe((res) => {
      this.lists = res;
    })
  }
  genFloatingContainer(){
    if(this.floatingEl){
      this.floatingEl.remove();
      this.floatingEl.removeEventListener("click",() => {


      })
    }
  }

  ngOnDestroy(){
    if(this._change$) this._change$.unsubscribe(); // 取消订阅防止资源浪费
  }
}
