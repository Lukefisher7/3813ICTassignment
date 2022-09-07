import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {
SuperAdmin = {
createUser: true,
removeUser: true,
createGroup: true,
deleteGroup: true,
updateUserGroupPerms: true,
createChannel: true,
deleteChannel: true,
updateUserChannelPerms: true,
setGroupAssRole: true,
setGroupAdminRole: true,
setSuperAdminRole: true
};
GroupAdmin = {
  createUser: true,
  removeUser: true,
  createGroup: true,
  deleteGroup: true,
  updateUserGroupPerms: true,
  createChannel: true,
  deleteChannel: true,
  updateUserChannelPerms: true,
  setGroupAssRole: true,
  setGroupAdminRole: false,
  setSuperAdminRole: false
  };
  GroupAssis = {
    createUser: false,
    removeUser: true,
    createGroup: false,
    deleteGroup: false,
    updateUserGroupPerms: false,
    createChannel: true,
    deleteChannel: false,
    updateUserChannelPerms: false,
    setGroupAssRole: false,
    setGroupAdminRole: false,
    setSuperAdminRole: false
    };

  constructor() { }
}
