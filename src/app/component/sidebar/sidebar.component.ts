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

  public list:Menu[]; // 路由集合

  constructor(
  ){

  }
  ngOnInit(){

  }
  ngOnDestroy(){

  }
}
