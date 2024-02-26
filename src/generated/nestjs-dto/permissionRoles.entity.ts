
import {Roles} from './roles.entity'
import {Permissions} from './permissions.entity'


export class PermissionRoles {
  id: number ;
role?: Roles ;
roleId: number ;
permission?: Permissions ;
permissionId: number ;
}
