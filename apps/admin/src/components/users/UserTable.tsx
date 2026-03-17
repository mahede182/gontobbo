import { TableHead } from "../common/Table/TableHead";
import { UserRow } from "@/components/users/UserRow";

export const UserTable = ({ users, mutate }: any) => (
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </tr>
    </thead>
    <tbody>
      {users?.map((user: any) => (
        <UserRow key={user.id} user={user} mutate={mutate} />
      ))}
    </tbody>
  </table>
);
