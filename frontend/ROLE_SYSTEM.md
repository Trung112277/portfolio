# Hệ thống Phân quyền Dashboard

## Tổng quan
Hệ thống phân quyền được thiết kế để kiểm soát quyền truy cập vào các phần khác nhau của dashboard dựa trên role của user.

## Các Role
- **admin**: Có quyền truy cập đầy đủ, bao gồm User Management
- **user**: Chỉ có quyền truy cập các phần cơ bản (Overview, About Me, Tech, Projects)

## Cấu trúc Database
```sql
-- Bảng profiles đã có sẵn với field user_role
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  user_role TEXT NOT NULL CHECK (user_role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Các Component chính

### 1. Types (`types/user-roles.ts`)
- `UserRole`: Type cho các role
- `UserProfile`: Interface cho profile data
- `UserWithRole`: Interface kết hợp auth user và profile

### 2. Services
- `UserProfileService`: Quản lý CRUD operations cho profiles
- `AuthService`: Mở rộng với các method để check role

### 3. Hooks
- `useUserRole`: Hook chính để lấy thông tin role của user hiện tại

### 4. Components
- `RoleGuard`: Component wrapper để kiểm soát hiển thị theo role
- `AdminOnly`, `UserOnly`, `AllUsers`: Convenience components

## Cách sử dụng

### 1. Kiểm tra role trong component
```tsx
import { useUserRole } from '@/hooks/useUserRole';

function MyComponent() {
  const { isAdmin, userRole, loading } = useUserRole();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {isAdmin && <AdminOnlyContent />}
      <RegularContent />
    </div>
  );
}
```

### 2. Sử dụng RoleGuard
```tsx
import { AdminOnly, RoleGuard } from '@/components/common/role-guard';

function Dashboard() {
  return (
    <div>
      <AdminOnly fallback={<div>Access denied</div>}>
        <UserManagementPanel />
      </AdminOnly>
      
      <RoleGuard allowedRoles={['admin', 'user']}>
        <RegularPanel />
      </RoleGuard>
    </div>
  );
}
```

### 3. Kiểm tra role trong service
```tsx
import { AuthService } from '@/services/auth.service';

async function someFunction() {
  const isAdmin = await AuthService.isAdmin();
  if (!isAdmin) {
    throw new Error('Admin access required');
  }
  // Admin-only logic here
}
```

## Setup Admin User

### Cách 1: Sử dụng script
1. Đăng nhập vào dashboard
2. Mở browser console
3. Chạy script:
```javascript
// Import script
import('/lib/admin-setup.js').then(module => {
  // Tạo admin profile cho user hiện tại
  const userId = 'your-user-id';
  const email = 'your-email@example.com';
  const displayName = 'Your Name';
  
  module.createAdminProfile(userId, email, displayName);
});
```

### Cách 2: Thông qua database
```sql
-- Tạo profile cho user
INSERT INTO profiles (id, email, display_name, user_role)
VALUES ('user-uuid', 'email@example.com', 'Display Name', 'admin');
```

## Bảo mật

### Frontend Protection
- Menu items được filter theo role
- Route protection trong dashboard content
- Component-level protection với RoleGuard

### Backend Protection (Cần implement)
- API endpoints cần kiểm tra role
- Middleware để verify admin access
- Database RLS policies

## API Endpoints

### Profiles API
- `GET /api/profiles` - Lấy danh sách profiles (admin only)
- `POST /api/profiles` - Tạo profile mới
- `GET /api/profiles/[id]` - Lấy profile theo ID
- `PUT /api/profiles/[id]` - Cập nhật profile
- `DELETE /api/profiles/[id]` - Xóa profile

## Testing

### Test Cases
1. User với role 'user' không thể truy cập `/dashboard/user`
2. User với role 'admin' có thể truy cập tất cả sections
3. Menu sidebar chỉ hiển thị items phù hợp với role
4. RoleGuard hoạt động đúng với các role khác nhau

### Manual Testing
1. Tạo user với role 'user'
2. Kiểm tra menu sidebar không hiển thị "User"
3. Truy cập trực tiếp `/dashboard/user` → redirect về overview
4. Upgrade user thành admin
5. Kiểm tra menu sidebar hiển thị "User"
6. Truy cập `/dashboard/user` → hiển thị User Management

## Troubleshooting

### Common Issues
1. **Role không được load**: Kiểm tra UserProfileService và database connection
2. **Menu không filter**: Kiểm tra useUserRole hook và AppSidebar component
3. **Route protection không hoạt động**: Kiểm tra dashboard-content.tsx logic

### Debug
```tsx
// Thêm debug info
const { userRole, loading, error } = useUserRole();
console.log('User role:', { userRole, loading, error });
```
