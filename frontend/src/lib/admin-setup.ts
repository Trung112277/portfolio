import { supabase } from '@/lib/supabase-client';

// Script để tạo admin user đầu tiên
// Chạy script này trong browser console sau khi đã đăng nhập
export async function createAdminProfile(userId: string, email: string, displayName: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        display_name: displayName,
        user_role: 'admin'
      })
      .select()
      .single();

    if (error) {
      // console.error('Error creating admin profile:', error);
      return null;
    }

    console.log('Admin profile created successfully:', data);
    return data;
  } catch { 
    return null;
  }
}

// Hàm helper để upgrade user thành admin
export async function upgradeToAdmin(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ user_role: 'admin' })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      // console.error('Error upgrading to admin:', error);
      return null;
    }

    console.log('User upgraded to admin successfully:', data);
    return data;
  } catch {
    return null;
  }
}

// Hàm để downgrade admin thành user
export async function downgradeToUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ user_role: 'user' })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      // console.error('Error downgrading to user:', error);
      return null;
    }

    console.log('User downgraded to user successfully:', data);
    return data;
  } catch {
    return null;
  }
}

// Export để sử dụng trong browser console
if (typeof window !== 'undefined') {
  const globalWindow = window as unknown as Window & {
    createAdminProfile: typeof createAdminProfile;
    upgradeToAdmin: typeof upgradeToAdmin;
    downgradeToUser: typeof downgradeToUser;
  };
  
  globalWindow.createAdminProfile = createAdminProfile;
  globalWindow.upgradeToAdmin = upgradeToAdmin;
  globalWindow.downgradeToUser = downgradeToUser;
}
