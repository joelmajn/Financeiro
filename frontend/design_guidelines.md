# NeoWallet - Design Guidelines

## Language & Localization
- **All UI text, labels, and messages MUST be in Brazilian Portuguese (pt-BR)**
- No English text should appear in the user-facing interface

## Authentication Architecture
**Auth Required** - The app explicitly requires user accounts with:
- Email/password registration and login
- Password recovery flow
- Internal PIN lock (4-6 digits) with biometric support (Face ID/Touch ID when available)
- Auto-lock after inactivity returning to PIN/biometric screen
- Secure user data isolation per account

Auth Screens Required:
1. Welcome screen with NeoWallet logo
2. Sign up (name, email, password)
3. Login (email, password)
4. Password recovery
5. PIN setup (first time)
6. PIN/biometric unlock screen

## Navigation Architecture
**Tab Navigation** - 5 tabs for main feature areas:

1. **Início/Home** (Dashboard/Summary)
2. **Contas** (Accounts & Wallets)
3. **[+]** Center FAB for quick expense/income entry
4. **Cartões** (Credit Cards)
5. **Relatórios** (Reports & Goals)

Additional flows:
- Onboarding stack (first-time user setup: income questions, objectives, tutorial)
- Settings drawer/screen for alerts, preferences, security
- Modal screens for forms (add account, add card, add expense, etc.)

## Screen Specifications

### 1. Welcome/Login Screens
- Full-screen gradient background (dark blue/purple)
- Centered NeoWallet logo with neon glow effect
- Rounded input fields with subtle borders
- Prominent CTA buttons with neon accents
- Navigation: Stack-only (no tabs)

### 2. Onboarding Flow
- Linear progression (3-4 steps)
- Questions: monthly income, existing debts, financial goals
- Tutorial screens explaining key features
- Skip option in header
- "Começar" (Start) button at bottom
- Navigation: Stack with progress indicator in header

### 3. Dashboard (Home Tab)
- Header: Transparent, with month selector and settings icon
- Scrollable main content with cards:
  - Saldo do Mês card (current month balance)
  - Projeção de Saldo card (projected end-of-month balance)
  - Saldo Disponível bar (available to spend visual indicator)
  - Quick stats: Total recebido, Total gasto, Cartões
- Safe area: top = insets.top + Spacing.xl, bottom = tabBarHeight + Spacing.xl
- Cards have rounded corners (borderRadius: 16) and soft shadows

### 4. Contas (Accounts Tab)
- Header: Title "Minhas Contas", add button (+) on right
- List of account cards showing: icon, name, type, current balance
- Tapping card opens detail screen with transactions
- FAB for "Adicionar Conta"
- Safe area: top = insets.top + Spacing.xl, bottom = tabBarHeight + Spacing.xl

### 5. Cartões (Credit Cards Tab)
- Header: Title "Cartões de Crédito", add button (+) on right
- Card carousel or list showing each card:
  - Card visual (mimicking credit card design)
  - Limite usado/disponível progress bar
  - Fatura atual value
- Detail screen per card:
  - Scrollable list of purchases with installment info (2/10)
  - Categories, dates, amounts
- Safe area: top = insets.top + Spacing.xl, bottom = tabBarHeight + Spacing.xl

### 6. Quick Add (Center FAB)
- Opens modal with two prominent buttons:
  - "Adicionar Receita" (green accent)
  - "Adicionar Despesa" (red/orange accent)
- Each opens respective form modal

### 7. Relatórios (Reports Tab)
- Header: Period filter (month/quarter/year selector)
- Scrollable content with:
  - Summary cards (receitas, despesas, saldo)
  - Pie chart (despesas por categoria)
  - Line/bar chart (evolução do saldo)
  - Category ranking list
  - Metas section showing progress bars
- Safe area: top = insets.top + Spacing.xl, bottom = tabBarHeight + Spacing.xl

### 8. Form Screens (Modals)
All entry forms (add account, card, income, expense, goal) should:
- Use modal presentation
- Header with "Cancelar" (left) and "Salvar" (right) buttons
- Scrollable form with grouped fields
- Category icons for selection (despesas/receitas)
- Date pickers
- Account/card selectors
- Photo attachment option for receipts (upload de imagem)
- Form fields with rounded borders matching design system

## Design System

### Color Palette
**Dark Theme (default):**
- Background Primary: Dark blue (#0A0E27) or dark purple (#1A0A2E)
- Background Secondary: Slightly lighter blue/purple (#151B3D)
- Card Background: rgba(255,255,255,0.05) with backdrop blur
- Neon Accents:
  - Primary Blue: #00D9FF (cyan neon)
  - Success Green: #00FF88 (neon green)
  - Warning Orange: #FF6B00
  - Error Red: #FF3366
  - Secondary Purple: #B066FF
- Text Primary: #FFFFFF
- Text Secondary: rgba(255,255,255,0.7)
- Borders: rgba(255,255,255,0.1)

**Light Theme:**
- Background Primary: #F8F9FA
- Background Secondary: #FFFFFF
- Card Background: #FFFFFF with subtle shadow
- Accents: Same neon colors with slightly reduced saturation
- Text Primary: #1A1A1A
- Text Secondary: rgba(0,0,0,0.6)

### Typography
- **Heading 1**: 28pt, Bold (Saldo do Mês, screen titles)
- **Heading 2**: 22pt, SemiBold (card titles, section headers)
- **Heading 3**: 18pt, SemiBold (list item titles)
- **Body**: 16pt, Regular (descriptions, form labels)
- **Caption**: 14pt, Regular (secondary info, dates)
- **Small**: 12pt, Medium (tags, badges)
- Font Family: System default (SF Pro for iOS, Roboto for Android)

### Spacing & Layout
- Spacing.xs: 4px
- Spacing.sm: 8px
- Spacing.md: 16px
- Spacing.lg: 24px
- Spacing.xl: 32px
- Card padding: 16px
- Screen horizontal padding: 20px
- Vertical spacing between sections: 24px

### Components

**Cards:**
- Border radius: 16px
- Background: Semi-transparent with backdrop blur (dark mode) or white (light mode)
- Shadow (dark mode): none or very subtle glow
- Shadow (light mode): shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.08, shadowRadius: 8

**Buttons (Primary):**
- Height: 52px
- Border radius: 26px (fully rounded)
- Background: Gradient with neon accent colors
- Text: White, 16pt, SemiBold
- Press feedback: Slight scale down (0.95) + opacity 0.8

**Buttons (Secondary):**
- Same dimensions
- Border: 2px solid with neon accent
- Background: Transparent
- Text: Neon accent color

**FAB (Floating Action Button):**
- Size: 64x64px
- Border radius: 32px
- Background: Gradient (primary blue to purple)
- Icon: White, 28px
- Shadow: shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2
- Press: Scale down to 0.9

**Input Fields:**
- Height: 48px
- Border radius: 12px
- Border: 1px solid rgba(255,255,255,0.2) in dark mode
- Background: rgba(255,255,255,0.05) in dark mode
- Padding: 12px horizontal
- Focus state: Border color changes to neon accent

**Progress Bars:**
- Height: 8px
- Border radius: 4px
- Background: rgba(255,255,255,0.1)
- Fill: Gradient with neon color
- Animated on value change

### Icons & Visual Feedback
- Use Feather icons from @expo/vector-icons exclusively
- Category icons needed:
  - Casa (home)
  - Mercado (shopping-bag)
  - Transporte (truck)
  - Lazer (coffee)
  - Saúde (heart)
  - Educação (book)
  - Outros (more-horizontal)
- All touchable elements must have visual feedback (opacity or scale)
- NO emojis in the interface

### Charts & Data Visualization
- Pie chart: Use neon accent colors for categories
- Line/bar charts: Neon blue for income, neon orange for expenses
- Smooth animations on data updates
- Grid lines: rgba(255,255,255,0.05)

### Assets
**Required Custom Assets:**
- NeoWallet logo (with neon glow effect)
- Credit card background templates (visual design for card representation)
- Category icons set (if custom design is needed beyond Feather icons)
- Empty state illustrations for:
  - No accounts yet
  - No transactions
  - No goals set

### Accessibility
- Minimum touch target: 44x44px
- Text contrast ratio: 4.5:1 minimum
- Support dynamic type sizing
- Screen reader labels in Portuguese
- Haptic feedback for important actions (transaction saved, goal achieved)

### Notifications & Alerts
- System notifications for:
  - Upcoming bill due dates (despesas fixas)
  - Credit card payment due
  - Budget exceeded in category
  - Credit card usage exceeds X% of monthly income
- In-app alert badge on relevant tabs
- Alert modals with rounded corners matching design system