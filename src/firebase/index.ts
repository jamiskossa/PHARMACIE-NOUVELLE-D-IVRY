'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // Guard to ensure Firebase environment variables are present before initializing.
  const requiredVars = [
    firebaseConfig.apiKey,
    firebaseConfig.authDomain,
    firebaseConfig.projectId,
    firebaseConfig.appId,
  ];

  // In development, we might not have all variables, but for build/production they are required
  if (process.env.NODE_ENV === "production" && requiredVars.some((value) => !value)) {
    const errorMsg = 'Missing Firebase environment variables. The build will fail. Ensure NEXT_PUBLIC_FIREBASE_* variables are set in your deployment environment.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Initialize with the explicit config object
  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
