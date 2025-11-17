"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, User, Ban, ShieldCheck } from "lucide-react";
import { UserBanManagement } from "@/components/user-ban-management";

interface UsersListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any[];
}

export function UsersList({ users }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email?.toLowerCase().includes(searchLower) ||
      user.fullName?.toLowerCase().includes(searchLower) ||
      user.name?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Users List
        </CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Deposit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ban Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center text-muted-foreground"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => {
                  const userId = user.id || user._id?.toString();
                  return (
                    <TableRow key={userId}>
                      <TableCell className="font-medium">
                        {user.fullName || user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.accountType || "-"}</TableCell>
                      <TableCell>{user.country || "-"}</TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          ${user.balance || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          ${user.depositAmount || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user.approvalStatus || "pending")}
                      </TableCell>
                      <TableCell>
                        {user.isBanned ? (
                          <Badge variant="destructive" className="gap-1">
                            <Ban className="h-3 w-3" />
                            Banned
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <UserBanManagement
                          userId={userId}
                          isBanned={user.isBanned}
                          userName={user.fullName || user.name}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        {filteredUsers.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredUsers.length} / {users.length} users
          </div>
        )}
      </CardContent>
    </Card>
  );
}
