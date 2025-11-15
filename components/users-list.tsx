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
import { Search, User } from "lucide-react";

interface UsersListProps {
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
        return <Badge variant="default">Đã duyệt</Badge>;
      case "rejected":
        return <Badge variant="destructive">Từ chối</Badge>;
      case "pending":
        return <Badge variant="secondary">Chờ duyệt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Danh sách Users
        </CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo email hoặc tên..."
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
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Loại TK</TableHead>
                <TableHead>Quốc gia</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Deposit</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground"
                  >
                    Không tìm thấy user nào
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
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                          : "-"}
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
            Hiển thị {filteredUsers.length} / {users.length} users
          </div>
        )}
      </CardContent>
    </Card>
  );
}
