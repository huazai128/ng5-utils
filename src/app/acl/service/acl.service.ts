import { Injectable } from '@angular/core';
import { ACLCanType,ACLType } from './acl.type';
import {type} from "os";

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

  /**
   * 当前用户是否有对应权限,number
   */
  can(roleOrAbility:ACLCanType):boolean{
    if(this.full || !roleOrAbility){
      return true;
    }
    let t:ACLType = {};
    if(typeof roleOrAbility === 'number'){
      t = {ability:[roleOrAbility]}
    }else if(Array.isArray(roleOrAbility) && !!roleOrAbility.length && typeof roleOrAbility[0] === 'number'){
      t = { ability:roleOrAbility }
    }else{
      t = this.parseACLType(roleOrAbility);
    }
    if(t.role){
      for(const _r of t.role){
        if(this.roles.includes(_r)){
          return true;
        }
      }
    }
    if(t.ability){
      for (const _p of t.ability) {
        if (this.abilities.includes(_p)) {
          return true;
        }
      }
    }
    return false;
  }
  // 其他acl 传递的类型
  private parseACLType(val:string | string[] | ACLType):ACLType{
    if(typeof val !== 'string' && !Array.isArray(val)){
      return <ACLType>val;
    }
    if(Array.isArray(val)){
      return <ACLType>{ role:<string[]>val };
    }
    return <ACLType>{role:[val]};
  }
}
