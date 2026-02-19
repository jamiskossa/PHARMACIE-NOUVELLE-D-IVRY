'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { User as FirebaseUser } from 'firebase/auth';
import type { User as AppUser } from '@/types';

interface AuthContextType {
  user: AppUser | null;
  authUser: FirebaseUser | null;
  role: AppUser['role'] | null;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: authUser, isUserLoading: isAuthUserLoading, userError } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !authUser?.uid) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser]);

  const { data: userProfile, isLoading: isProfileLoading, error: profileError } = useDoc<AppUser>(userDocRef);

  const isLoading = isAuthUserLoading || isProfileLoading;
  const error = userError || profileError;

  const value = useMemo(() => ({
    user: userProfile,
    authUser: authUser,
    role: userProfile?.role ?? null,
    isLoading,
    error,
  }), [userProfile, authUser, isLoading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
