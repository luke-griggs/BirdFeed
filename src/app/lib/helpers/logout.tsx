import React from 'react';
import { trpc } from "@/app/utils/trpc";
import { useRouter } from 'next/router';

export function LogoutButton() {
  const logout = trpc.auth.logout.useMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.push('/login');  // Redirect after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  )

}