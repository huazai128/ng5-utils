import { Injectable,Inject } from '@angular/core';
import { PlatformLocation,DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs/observable/fromEvent';

export const topMargin = 16;

@Injectable()
export class ScrollService{
  private _topOfferset:number | null;
  private _topOfPageElement:Element;

  get topOffset(){
    if(!this._topOfferset){
      const toolbar =  this.doc.querySelector(".header");
      this._topOfferset = (toolbar && toolbar.clientHeight || 0) + topMargin;
    }
    return this._topOfferset;
  }

  get topOfPageElement(){
    if(!this._topOfPageElement){
      this._topOfPageElement = this.doc.getElementById('top-of-page') || this.doc.body;
    }
    return this._topOfPageElement;
  }
  constructor(@Inject(DOCUMENT) private doc:any,private location:PlatformLocation){
    // 监听窗口变化，
    fromEvent(window,'resize').subscribe((e) => {
      this._topOfferset = null;
    })
  }

  public scroll(){
    const hash = this.getCurrentHash();
    console.log(hash);
    const ele:HTMLElement = hash ? this.doc.getElementById(hash) : this._topOfPageElement;
    this.scrollerElement(ele);
  }

  private scrollerElement(ele:Element){
    if(ele){
      ele.scrollIntoView(); // 使用滚动条和当前容器平齐
      if(window && window.scrollBy){ // 理解是scrollTo(x,y)和scrollBy(x,y)的区别，scrollTo：相对初始位置；scrollBy相对当前位置
        window.scrollBy(0,ele.getBoundingClientRect().top - this.topOffset);
        if(window.pageYOffset < 20) {
          window.scrollBy(0,-window.pageYOffset);
        }
      }
    }
  }

  public scrollToTop(){
    this.scrollerElement(this.topOfPageElement);
  }

  // 获取当前路径
  private getCurrentHash(){
    return this.location.hash.replace(/^#/, '');
  }
}
