# Tính năng Restricted User (User bị cấm)

## Tổng quan

Tính năng này cho phép admin khóa/mở khóa tài khoản người dùng. Khi user bị khóa, một "ban wall" sẽ hiển thị toàn màn hình và chặn tất cả các chức năng, chỉ cho phép user đăng xuất hoặc liên hệ hỗ trợ.

## Các thành phần đã được tạo

### 1. Database Schema

Đã thêm các trường vào user model trong `lib/better-auth/auth.ts`:

- `isBanned` (boolean): Trạng thái khóa tài khoản
- `banReason` (string): Lý do khóa tài khoản
- `banContactEmail` (string): Email liên hệ hỗ trợ (mặc định: support@giftauvr.com)

### 2. Components

#### `components/ban-wall.tsx`

Component hiển thị màn hình ban wall với:

- Icon cảnh báo
- Lý do khóa tài khoản
- Email liên hệ hỗ trợ
- Nút đăng xuất

#### `components/ban-wall-provider.tsx`

Provider wrapper kiểm tra trạng thái ban của user và hiển thị ban wall nếu cần.

#### `components/user-ban-management.tsx`

Component quản lý ban/unban user cho admin panel:

- Nút khóa tài khoản (nếu user chưa bị khóa)
- Nút mở khóa tài khoản (nếu user đã bị khóa)
- Form nhập lý do và email liên hệ

### 3. Server Actions

Đã thêm vào `lib/actions/admin.actions.ts`:

#### `banUser(userId, banReason, banContactEmail?)`

Khóa tài khoản user với lý do và email liên hệ.

```typescript
const result = await banUser(
  "user_id_123",
  "Vi phạm điều khoản sử dụng",
  "support@giftauvr.com"
);
```

#### `unbanUser(userId)`

Mở khóa tài khoản user.

```typescript
const result = await unbanUser("user_id_123");
```

## Cách sử dụng

### Trong Admin Panel

1. Import component `UserBanManagement`:

```tsx
import { UserBanManagement } from "@/components/user-ban-management";
```

2. Sử dụng trong danh sách users:

```tsx
<UserBanManagement
  userId={user._id}
  isBanned={user.isBanned}
  userName={user.name}
/>
```

### Ví dụ sử dụng trong trang admin

```tsx
// app/(admin)/admin/users/page.tsx
import { UserBanManagement } from "@/components/user-ban-management";
import { getAllUsers } from "@/lib/actions/admin.actions";

export default async function UsersPage() {
  const { data: users } = await getAllUsers();

  return (
    <div>
      <h1>Quản lý Users</h1>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isBanned ? (
                  <span className="text-red-500">Đã khóa</span>
                ) : (
                  <span className="text-green-500">Hoạt động</span>
                )}
              </td>
              <td>
                <UserBanManagement
                  userId={user._id}
                  isBanned={user.isBanned}
                  userName={user.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Cách hoạt động

1. **Khóa tài khoản**:

   - Admin click nút "Khóa tài khoản"
   - Nhập lý do và email liên hệ (optional)
   - Xác nhận → Tài khoản bị khóa

2. **User bị khóa**:

   - Khi user đăng nhập hoặc đang sử dụng app
   - `BanWallProvider` kiểm tra `user.isBanned`
   - Nếu `true` → Hiển thị `BanWall` toàn màn hình
   - User chỉ có thể đăng xuất hoặc liên hệ email hỗ trợ

3. **Mở khóa tài khoản**:
   - Admin click nút "Mở khóa"
   - Xác nhận → Tài khoản được mở khóa
   - User có thể đăng nhập và sử dụng bình thường

## Lưu ý

- Tính năng này **KHÔNG sử dụng middleware** như yêu cầu
- Ban wall sẽ liên tục hiển thị cho đến khi user đăng xuất
- Tất cả các chức năng bị vô hiệu hóa khi user bị khóa
- Admin cần có quyền truy cập admin panel để sử dụng tính năng này

## UI/UX Features

- Ban wall có backdrop blur effect
- Animation fade-in khi hiển thị
- Không thể đóng ban wall (chỉ có thể đăng xuất)
- Hiển thị đầy đủ thông tin: lý do, liên hệ, nút đăng xuất
- Toast notifications khi ban/unban thành công
- Form validation cho lý do khóa tài khoản
