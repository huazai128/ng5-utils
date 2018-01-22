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
  changeDetection:ChangeDetectionStrategy.OnPush, //用于检测数据变化
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
    public settingSer:SettingService,
    private el:ElementRef,
    private render:Renderer2,
    private router:Router,
    private cd:ChangeDetectorRef, // 用于检测bian
    @Inject(DOCUMENT) private doc:any
  ){
    this.rootEl =  this.el.nativeElement as HTMLDivElement;
  }
  ngOnInit(){
    this.bodyEl = this.doc.querySelector('body');
    this.menuSer.openedByUrl(this.router.url);
    this._change$ = this.menuSer.change.subscribe((res) => {
      this.lists = res;
      this.cd.detectChanges(); // 手动检测变动
    })
  }

  toggleOpen(item:Menu){

  }

  ngOnDestroy(){
    if(this._change$) this._change$.unsubscribe();
  }
}
