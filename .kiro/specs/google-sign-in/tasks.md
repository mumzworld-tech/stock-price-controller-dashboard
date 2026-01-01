# Implementation Plan: Google Sign-In

## Overview

This implementation plan covers adding Google OAuth authentication to the SPCS Dashboard using Better Auth. The implementation follows a progressive approach: setting up the auth infrastructure first, then implementing route protection, and finally integrating user data into the UI.

## Tasks

- [x] 1. Set up Better Auth infrastructure
  - [x] 1.1 Install Better Auth package and dependencies
    - Install `better-auth` package
    - _Requirements: 6.1, 6.2_
  - [x] 1.2 Create auth server configuration (`lib/auth.ts`)
    - Configure Better Auth with Google OAuth provider
    - Add email domain validation callback to reject non-@mumzworld.com emails
    - Configure stateless session with cookie cache
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.3_
  - [x] 1.3 Create auth client (`lib/auth-client.ts`)
    - Set up Better Auth React client
    - Export signIn, signOut, and useSession utilities
    - _Requirements: 1.1, 5.1_
  - [x] 1.4 Create API route handler (`app/api/auth/[...all]/route.ts`)
    - Mount Better Auth handler for all auth API routes
    - _Requirements: 1.2, 1.3_
  - [x] 1.5 Update environment variables (`.env.example`)
    - Add BETTER_AUTH_SECRET and BETTER_AUTH_URL
    - _Requirements: 6.3, 6.4_

- [x] 2. Implement email validation and route protection
  - [x] 2.1 Create email validation utility (`lib/auth-utils.ts`)
    - Implement `isValidMumzworldEmail` function
    - _Requirements: 2.1, 2.3_
  - [ ]\* 2.2 Write property tests for email validation
    - **Property 1: Email Domain Validation Rejects Invalid Domains**
    - **Property 2: Email Domain Validation Accepts Valid Domains**
    - **Validates: Requirements 2.1, 2.3**
  - [x] 2.3 Create auth proxy (`proxy.ts`)
    - Check for valid session on protected routes using Better Auth's getSession
    - Redirect unauthenticated users to sign-in page
    - Configure matcher for `/(main)` routes with Node.js runtime
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 3. Checkpoint - Verify auth infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create sign-in page and error handling
  - [x] 4.1 Create sign-in page (`app/sign-in/page.tsx`)
    - Display "Sign in with Google" button using Google icon component
    - Handle error query parameters and display appropriate messages
    - Implement sign-in action using authClient.signIn.social
    - _Requirements: 1.1, 2.2_
  - [x] 4.2 Create error message utility
    - Map error codes to user-friendly messages
    - Handle access_denied error for invalid email domain
    - _Requirements: 2.2_

- [x] 5. Integrate authentication with sidebar
  - [x] 5.1 Update app sidebar (`components/nav/app-sidebar.tsx`)
    - Replace hardcoded user data with session data from useSession hook
    - Handle loading and unauthenticated states
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 5.2 Update NavUser component for sign-out
    - Wire "Log out" button to authClient.signOut
    - Redirect to sign-in page after sign-out
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 5.3 Wrap app with session context
    - Update root layout or main layout to provide session context if needed
    - _Requirements: 4.1_

- [x] 6. Checkpoint - Verify complete authentication flow
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Better Auth handles session management automatically via cookies
- No database setup required - using stateless session mode
- Property tests validate email domain validation logic
