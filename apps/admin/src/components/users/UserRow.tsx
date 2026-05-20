"use client";
import { TableCell } from "../common/Table/TableCell";
import { updateUserRole } from "@/hooks/useUsers";
import { useTranslation } from "react-i18next";

export const UserRow = ({ user, mutate }: any) => {
  const { t } = useTranslation();

  const handleRoleChange = async (e: any) => {
    await updateUserRole(user.id, e.target.value);
    mutate();
  };

  return (
    <tr>
      <TableCell>
        {user.firstName} {user.lastName}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <select value={user.role} onChange={handleRoleChange}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </TableCell>
      <TableCell>
        <span className={user.isActive ? "text-success" : "text-danger"}>
          {user.isActive ? t("common.active") : t("common.inactive")}
        </span>
      </TableCell>
    </tr>
  );
};
