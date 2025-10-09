"use client";

import { useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProfileUser } from "@/services/users.service";
import { RefreshCw } from "lucide-react";

export default function UserEdit() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<ProfileUser[]>([]);

  useEffect(() => {
    console.log('UserEdit component mounted, fetching users...');
    fetchUsersRef.current = fetchUsers();
    
    // Cleanup function to prevent memory leaks
    return () => {
      console.log('UserEdit component unmounted');
      fetchUsersRef.current = null;
    };
  }, []);

  // Add a ref to track if component is mounted
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Add a ref to prevent duplicate API calls
  const fetchUsersRef = useRef<Promise<void> | null>(null);

  const fetchUsers = async () => {
    try {
      console.log('fetchUsers called, isMounted:', isMountedRef.current);
      if (!isMountedRef.current) {
        console.log('Component unmounted, skipping fetch');
        return;
      }

      // Prevent duplicate API calls
      if (fetchUsersRef.current) {
        console.log('API call already in progress, skipping duplicate');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }
      
      if (isMountedRef.current) {
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Error in fetchUsers:', err);
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
      fetchUsersRef.current = null;
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update role');
      }
      
      toast.success('Role updated successfully');
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, user_role: newRole } : user
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
      toast.error('Failed to update role');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={fetchUsers} 
          disabled={loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <div className="w-full table-scroll overflow-x-auto">
        <table className="w-full text-center min-w-[600px]">
          <thead>
            <tr className=" text-xl font-bold border-b text-primary text-center">
              <th className="p-2 border w-[100px]">ID</th>
                  <th className="p-2 border w-[150px]">Name</th>
              <th className="p-2 border w-[150px]">Email</th>
              <th className="p-2 border w-[100px]">Role</th>
                <th className="p-2 border w-[150px]">Created at</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-gray-500">
                    No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.display_name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">
                    <Select
                      value={user.user_role}
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-2 border">{formatDate(user.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
