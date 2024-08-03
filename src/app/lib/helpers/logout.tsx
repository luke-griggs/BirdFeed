"use client"

import React from 'react';
import { trpc } from "@/app/utils/trpc";
import { Redirect } from 'next';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

export const SignOut = async () => {
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
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};