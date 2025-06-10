import { UserType } from "@/utils/typeUser";

export const RolePermissions: Record<UserType, string[]> = {
  [UserType.Student]: ['/dashboard/student/*'],
  [UserType.Teacher]: ['/dashboard/teacher/*'],
  [UserType.Registrar]: ['/dashboard/registrar/*'],
  [UserType.Department]: ['/dashboard/department/*'],
  [UserType.President]: ['/dashboard/president/*'],
};


export function hasPermission(role: UserType, path: string): boolean {
  const permissions = RolePermissions[role] || [];
  return permissions.some(permission => {
    if (permission.endsWith('/*')) {
      return path.startsWith(permission.slice(0, -2));
    }
    return path === permission;
  });
}