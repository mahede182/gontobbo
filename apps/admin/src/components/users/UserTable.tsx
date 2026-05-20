"use client";
import { TableHead } from "../common/Table/TableHead";
import { UserRow } from "@/components/users/UserRow";
import { useTranslation } from "react-i18next";

export const UserTable = ({ users, mutate }: any) => {
  const { t } = useTranslation();

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <TableHead>{t("staff.name")}</TableHead>
          <TableHead>{t("staff.email")}</TableHead>
          <TableHead>{t("staff.role")}</TableHead>
          <TableHead>{t("staff.status")}</TableHead>
        </tr>
      </thead>
      <tbody>
        {users?.map((user: any) => (
          <UserRow key={user.id} user={user} mutate={mutate} />
        ))}
      </tbody>
    </table>
  );
};
