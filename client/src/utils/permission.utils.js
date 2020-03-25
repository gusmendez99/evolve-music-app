// UTILS
const ADMIN_ROLE_NAME = "administrator"
const CUSTOMER_ROLE_NAME = "customer"

const PERMISSION_NAMES = [
  "REGISTER ARTIST",
  "READ ARTIST",
  "UPDATE ARTIST",
  "UPDATE ARTIST",
  "REGISTER ALBUM",
  "READ ALBUM",
  "UPDATE ALBUM",
  "UPDATE ALBUM",
  "REGISTER SONG",
  "READ SONG",
  "UPDATE SONG",
  "UPDATE SONG",
  "INACTIVATE SONG",
  "GENERATE REPORT",
  "READ ACTIVE SONG"
];

export const getPermissionsByRole = (permissions, roleName) => {
  const rolePermissionNames = permissions.map(permission => permission.name);

  const myPermissions = {
    canCreateArtist: rolePermissionNames.includes(PERMISSION_NAMES[0]),
    canReadArtist: rolePermissionNames.includes(PERMISSION_NAMES[1]),
    canUpdateArtist: rolePermissionNames.includes(PERMISSION_NAMES[2]),
    canDeleteArtist: rolePermissionNames.includes(PERMISSION_NAMES[3]),
    canCreateAlbum: rolePermissionNames.includes(PERMISSION_NAMES[4]),
    canReadAlbum: rolePermissionNames.includes(PERMISSION_NAMES[5]),
    canUpdateAlbum: rolePermissionNames.includes(PERMISSION_NAMES[6]),
    canDeleteAlbum: rolePermissionNames.includes(PERMISSION_NAMES[7]),
    canCreateTrack: rolePermissionNames.includes(PERMISSION_NAMES[8]),
    canReadTrack: rolePermissionNames.includes(PERMISSION_NAMES[9]),
    canUpdateTrack: rolePermissionNames.includes(PERMISSION_NAMES[10]),
    canDeleteTrack: rolePermissionNames.includes(PERMISSION_NAMES[11]),
    canInactivateTrack: rolePermissionNames.includes(PERMISSION_NAMES[12]),
    canGenerateReport: rolePermissionNames.includes(PERMISSION_NAMES[13]),
    isAdmin: roleName === ADMIN_ROLE_NAME,
    isCustomer: roleName === CUSTOMER_ROLE_NAME
  };

  return myPermissions;
};
