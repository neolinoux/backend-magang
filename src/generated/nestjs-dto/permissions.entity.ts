
import {PermissionRoles} from './permissionRoles.entity'
import {UserPermissions} from './userPermissions.entity'


export class Permissions {
  permissionId: number ;
permissionName: string ;
permissionRoles?: PermissionRoles[] ;
userPermissions?: UserPermissions[] ;
}
