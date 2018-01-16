export interface ACLType {
  // 角色
  role?;string;

  // 权限
  ability?:number[] | string[];
}

export type ACLCanType = number | number[] | string | string[] | ACLType;


