import { Roles } from "./roles.enum"
import { Permissions } from "./permissions.enum"

export class RolesPermission {
  static getRoles() {
    return Object.values(Roles);
  }

  static getPermissions() {
    return Object.values(Permissions);
  }

  static getAdminPermissions() {
    return [
      Permissions.CreateProfile,
      Permissions.ReadProfile,
      Permissions.UpdateProfile,
      Permissions.DeleteProfile,
      Permissions.CreateDaftarRekeningMahasiswa,
      Permissions.ReadDaftarRekeningMahasiswa,
      Permissions.UpdateDaftarRekeningMahasiswa,
      Permissions.DeleteDaftarRekeningMahasiswa,
      Permissions.CreateUserMahasiswa,
      Permissions.ReadUserMahasiswa,
      Permissions.UpdateUserMahasiswa,
      Permissions.DeleteUserMahasiswa,
      Permissions.CreateDPM,
      Permissions.ReadDPM,
      Permissions.UpdateDPM,
      Permissions.DeleteDPM,
      Permissions.CreatePemlap,
      Permissions.ReadPemlap,
      Permissions.UpdatePemlap,
      Permissions.DeletePemlap,
      Permissions.CreateAdminProvinsi,
      Permissions.ReadAdminProvinsi,
      Permissions.UpdateAdminProvinsi,
      Permissions.DeleteAdminProvinsi,
      Permissions.CreateAdminSatker,
      Permissions.ReadAdminSatker,
      Permissions.UpdateAdminSatker,
      Permissions.DeleteAdminSatker,
      Permissions.CreatePilihanTempatMagang,
      Permissions.ReadPilihanTempatMagang,
      Permissions.UpdatePilihanTempatMagang,
      Permissions.DeletePilihanTempatMagang,
      Permissions.CreateUnitKerjaTempatMagang,
      Permissions.ReadUnitKerjaTempatMagang,
      Permissions.UpdateUnitKerjaTempatMagang,
      Permissions.DeleteUnitKerjaTempatMagang,
      Permissions.CreatePresensiMagang,
      Permissions.ReadPresensiMagang,
      Permissions.UpdatePresensiMagang,
      Permissions.DeletePresensiMagang,
    ];
  }

  static getTimMagangPermissions() {
    return [
      Permissions.CreateProfile,
      Permissions.ReadProfile,
      Permissions.UpdateProfile,
      Permissions.DeleteProfile,
      Permissions.CreateUserMahasiswa,
      Permissions.ReadUserMahasiswa,
      Permissions.UpdateUserMahasiswa,
      Permissions.DeleteUserMahasiswa,
      Permissions.CreateDPM,
      Permissions.ReadDPM,
      Permissions.UpdateDPM,
      Permissions.DeleteDPM,
      Permissions.CreatePemlap,
      Permissions.ReadPemlap,
      Permissions.UpdatePemlap,
      Permissions.DeletePemlap,
      
    ];
  }
}