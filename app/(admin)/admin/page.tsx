import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, CreditCard, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  // TODO: Fetch real data from database
  const stats = [
    {
      title: "Tổng người dùng",
      value: "0",
      icon: Users,
      description: "Người dùng đã đăng ký",
    },
    {
      title: "Chờ phê duyệt",
      value: "0",
      icon: CheckCircle,
      description: "Tài khoản chờ phê duyệt",
    },
    {
      title: "Yêu cầu rút tiền",
      value: "0",
      icon: CreditCard,
      description: "Chờ xử lý",
    },
    {
      title: "Tổng số dư",
      value: "$0",
      icon: DollarSign,
      description: "Tổng số dư hệ thống",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Tổng quan về hệ thống quản lý</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Chưa có hoạt động nào
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dữ liệu thống kê sẽ hiển thị ở đây
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
