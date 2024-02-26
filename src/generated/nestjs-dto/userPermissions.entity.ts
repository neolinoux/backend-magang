
import {User} from './user.entity'
import {Permissions} from './permissions.entity'


export class UserPermissions {
  id: number ;
user?: User ;
userId: number ;
permission?: Permissions ;
permissionId: number ;
}
