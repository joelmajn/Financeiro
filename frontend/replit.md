# NeoWallet - Personal Finance Management App

> Este documento agora mora em `frontend/`. O projeto não possui backend neste repositório; toda a lógica está contida no app Expo.

## Overview

NeoWallet is a comprehensive personal finance management mobile application built with React Native and Expo. The app helps users track their income, expenses, bank accounts, credit cards, and financial goals - all in Brazilian Portuguese (pt-BR).

The application provides real-time financial projections, categorized expense tracking, credit card management with installment support, and goal-based savings features. It's designed with a modern, neon-themed UI that adapts to light and dark modes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Platform**
- Built with React Native 0.81.5 and Expo SDK 54
- Cross-platform support (iOS, Android, Web)
- TypeScript for type safety
- New Architecture enabled for improved performance

**Navigation Structure**
- Stack-based authentication flow (Welcome → Login/Signup → PIN Setup)
- Tab-based main navigation with 5 tabs (Dashboard, Accounts, Add Transaction, Cards, Reports)
- Modal screens for forms (Add Account, Add Card, Add Transaction, Add Goal, Add Fixed Expense)
- Conditional navigation based on authentication and onboarding state

**State Management**
- Context API for global state management
- AuthContext: Manages authentication state, onboarding completion, and PIN lock status
- DataContext: Manages all financial data (accounts, cards, transactions, goals)
- No external state management libraries (Redux, MobX) used

**UI/UX Design Patterns**
- Theme system with light/dark mode support using custom useTheme hook
- Consistent color palette with neon accents (blue, green, orange, red, purple)
- Reusable component library (ThemedView, ThemedText, Input, Button variants)
- Screen wrapper components (ScreenScrollView, ScreenKeyboardAwareScrollView, ScreenFlatList) for consistent spacing and insets
- Platform-specific blur effects (iOS uses BlurView, Android uses solid backgrounds)
- Animated interactions using react-native-reanimated

**Key Architectural Decisions**
- Separation of presentation (components) and business logic (contexts/utils)
- Path aliases (@/) for cleaner imports configured via babel-plugin-module-resolver
- Safe area handling with react-native-safe-area-context throughout
- Keyboard-aware scrolling on forms
- Error boundary implementation for graceful error handling

### External Dependencies

**Core Navigation & UI**
- @react-navigation/native (v7.1.8) - Navigation framework
- @react-navigation/native-stack (v7.3.16) - Stack navigator
- @react-navigation/bottom-tabs (v7.4.0) - Tab navigator
- react-native-reanimated (v4.1.1) - Animation library
- react-native-gesture-handler (v2.28.0) - Gesture system
- react-native-screens (v4.16.0) - Native screen optimization

**Expo Modules**
- expo-linear-gradient - Gradient backgrounds and buttons
- expo-blur - iOS blur effects for navigation bars and cards
- expo-local-authentication - Biometric authentication (Face ID/Touch ID)
- expo-secure-store - Secure PIN storage
- expo-haptics - Haptic feedback
- expo-image - Optimized image component

**Data Storage**
- @react-native-async-storage/async-storage (v2.2.0) - Local data persistence for all financial data (accounts, cards, transactions, goals)
- No backend server - all data stored locally on device
- expo-secure-store for sensitive data (PIN codes)

**Development Tools**
- ESLint with Expo configuration
- Prettier for code formatting
- TypeScript for type checking
- babel-plugin-module-resolver for path aliases

**Platform-Specific Considerations**
- iOS: Native blur effects, Face ID support, adaptive tab bar
- Android: Edge-to-edge display, fingerprint authentication, material adaptive icons
- Web: Fallback to standard ScrollView for keyboard awareness (KeyboardAwareScrollView not web-compatible)

**Security Architecture**
- Multi-layer authentication: Email/password → PIN (4-6 digits) → Biometric (optional)
- PIN stored in expo-secure-store (encrypted storage)
- Auto-lock functionality after inactivity
- No external authentication service (Firebase, Auth0) - local authentication only

**Data Model**
- TypeScript interfaces defined in types/index.ts
- Entities: User, Account, CreditCard, Purchase, Income, FixedExpense, VariableExpense, FinancialGoal
- All entities have unique IDs and creation timestamps
- Financial calculations performed in-memory from stored data