import { Injectable } from '@angular/core';
import { ACLCanType,ACLType } from './acl.type';

// 控制权限访问
@Injectable()
export class AclService{
  private roles:string[] = [];
  private abilities:(number | string)[] = [];
  private full = false;

  // 获取所有数据
  get data() {
    return{
      roles: this.roles,
      full:this.full,
      abilities:this.abilities
    };
  }


}
