export interface User {
  id: string;
  name: string;
  email: string;
  monthlyIncome: number;
  hasDebts: boolean;
  financialGoals: string[];
}

export interface Account {
  id: string;
  name: string;
  type: "bank" | "wallet" | "savings" | "investment";
  balance: number;
  icon: string;
  createdAt: string;
}

export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  brand: string;
  limit: number;
  closingDay: number;
  dueDay: number;
  currentBalance: number;
  createdAt: string;
}

export interface Purchase {
  id: string;
  cardId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  installments: number;
  currentInstallment: number;
}

export interface Income {
  id: string;
  amount: number;
  date: string;
  category: string;
  accountId: string;
  description?: string;
  createdAt: string;
}

export interface FixedExpense {
  id: string;
  name?: string;
  description?: string;
  amount: number;
  dueDay: number;
  type?: "boleto" | "debit" | "credit";
  accountId?: string;
  cardId?: string;
  category: string;
  isPaid: boolean;
  createdAt: string;
}

export interface VariableExpense {
  id: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: "cash" | "debit" | "credit" | "pix";
  accountId?: string;
  cardId?: string;
  description?: string;
  receipt?: string;
  createdAt: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  deadline?: string;
  accountId?: string;
  icon?: string;
  createdAt: string;
}

export type ExpenseCategory =
  | "casa"
  | "mercado"
  | "transporte"
  | "lazer"
  | "saude"
  | "educacao"
  | "outros";

export type IncomeCategory =
  | "salario"
  | "freelance"
  | "investimento"
  | "extra"
  | "outros";
