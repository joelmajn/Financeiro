import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  User,
  Account,
  CreditCard,
  Income,
  FixedExpense,
  VariableExpense,
  FinancialGoal,
  Purchase,
} from "@/types";

const STORAGE_KEYS = {
  USER: "@neowallet:user",
  ACCOUNTS: "@neowallet:accounts",
  CARDS: "@neowallet:cards",
  PURCHASES: "@neowallet:purchases",
  INCOMES: "@neowallet:incomes",
  FIXED_EXPENSES: "@neowallet:fixed_expenses",
  VARIABLE_EXPENSES: "@neowallet:variable_expenses",
  GOALS: "@neowallet:goals",
  ONBOARDING_DATA: "@neowallet:onboarding_data",
};

async function saveData<T>(key: string, data: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    throw error;
  }
}

async function getData<T>(key: string): Promise<T | null> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
}

export const DataService = {
  async saveUser(user: User): Promise<void> {
    await saveData(STORAGE_KEYS.USER, user);
  },

  async getUser(): Promise<User | null> {
    return getData<User>(STORAGE_KEYS.USER);
  },

  async saveAccounts(accounts: Account[]): Promise<void> {
    await saveData(STORAGE_KEYS.ACCOUNTS, accounts);
  },

  async getAccounts(): Promise<Account[]> {
    const accounts = await getData<Account[]>(STORAGE_KEYS.ACCOUNTS);
    return accounts || [];
  },

  async saveCards(cards: CreditCard[]): Promise<void> {
    await saveData(STORAGE_KEYS.CARDS, cards);
  },

  async getCards(): Promise<CreditCard[]> {
    const cards = await getData<CreditCard[]>(STORAGE_KEYS.CARDS);
    return cards || [];
  },

  async savePurchases(purchases: Purchase[]): Promise<void> {
    await saveData(STORAGE_KEYS.PURCHASES, purchases);
  },

  async getPurchases(): Promise<Purchase[]> {
    const purchases = await getData<Purchase[]>(STORAGE_KEYS.PURCHASES);
    return purchases || [];
  },

  async saveIncomes(incomes: Income[]): Promise<void> {
    await saveData(STORAGE_KEYS.INCOMES, incomes);
  },

  async getIncomes(): Promise<Income[]> {
    const incomes = await getData<Income[]>(STORAGE_KEYS.INCOMES);
    return incomes || [];
  },

  async saveFixedExpenses(expenses: FixedExpense[]): Promise<void> {
    await saveData(STORAGE_KEYS.FIXED_EXPENSES, expenses);
  },

  async getFixedExpenses(): Promise<FixedExpense[]> {
    const expenses = await getData<FixedExpense[]>(STORAGE_KEYS.FIXED_EXPENSES);
    return expenses || [];
  },

  async saveVariableExpenses(expenses: VariableExpense[]): Promise<void> {
    await saveData(STORAGE_KEYS.VARIABLE_EXPENSES, expenses);
  },

  async getVariableExpenses(): Promise<VariableExpense[]> {
    const expenses = await getData<VariableExpense[]>(
      STORAGE_KEYS.VARIABLE_EXPENSES
    );
    return expenses || [];
  },

  async saveGoals(goals: FinancialGoal[]): Promise<void> {
    await saveData(STORAGE_KEYS.GOALS, goals);
  },

  async getGoals(): Promise<FinancialGoal[]> {
    const goals = await getData<FinancialGoal[]>(STORAGE_KEYS.GOALS);
    return goals || [];
  },

  async saveOnboardingData(data: {
    monthlyIncome: number;
    hasDebts: boolean;
  }): Promise<void> {
    await saveData(STORAGE_KEYS.ONBOARDING_DATA, data);
  },

  async getOnboardingData(): Promise<{
    monthlyIncome: number;
    hasDebts: boolean;
  } | null> {
    return getData<{ monthlyIncome: number; hasDebts: boolean }>(
      STORAGE_KEYS.ONBOARDING_DATA
    );
  },

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing all data:", error);
      throw error;
    }
  },
};
