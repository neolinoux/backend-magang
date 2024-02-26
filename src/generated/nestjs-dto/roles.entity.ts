
import {UserRoles} from './userRoles.entity'
import {PermissionRoles} from './permissionRoles.entity'


export class Roles {
  roleId: number ;
roleName: string ;
userRoles?: UserRoles[] ;
permissionRoles?: PermissionRoles[] ;
}
