import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  Account,
  CreditCard,
  Income,
  FixedExpense,
  VariableExpense,
  FinancialGoal,
  Purchase,
} from "@/types";
import { DataService } from "@/utils/dataService";

interface DataContextType {
  accounts: Account[];
  cards: CreditCard[];
  purchases: Purchase[];
  incomes: Income[];
  fixedExpenses: FixedExpense[];
  variableExpenses: VariableExpense[];
  goals: FinancialGoal[];
  loading: boolean;
  addAccount: (account: Omit<Account, "id" | "createdAt">) => Promise<void>;
  updateAccount: (id: string, updates: Partial<Account>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  addCard: (card: Omit<CreditCard, "id" | "createdAt">) => Promise<void>;
  updateCard: (id: string, updates: Partial<CreditCard>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  addPurchase: (purchase: Omit<Purchase, "id">) => Promise<void>;
  addIncome: (income: Omit<Income, "id" | "createdAt">) => Promise<void>;
  addFixedExpense: (
    expense: Omit<FixedExpense, "id" | "createdAt">
  ) => Promise<void>;
  updateFixedExpense: (
    id: string,
    updates: Partial<FixedExpense>
  ) => Promise<void>;
  addVariableExpense: (
    expense: Omit<VariableExpense, "id" | "createdAt">
  ) => Promise<void>;
  addGoal: (goal: Omit<FinancialGoal, "id" | "createdAt">) => Promise<void>;
  updateGoal: (id: string, updates: Partial<FinancialGoal>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);
  const [variableExpenses, setVariableExpenses] = useState<VariableExpense[]>(
    []
  );
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        accountsData,
        cardsData,
        purchasesData,
        incomesData,
        fixedData,
        variableData,
        goalsData,
      ] = await Promise.all([
        DataService.getAccounts(),
        DataService.getCards(),
        DataService.getPurchases(),
        DataService.getIncomes(),
        DataService.getFixedExpenses(),
        DataService.getVariableExpenses(),
        DataService.getGoals(),
      ]);

      setAccounts(accountsData);
      setCards(cardsData);
      setPurchases(purchasesData);
      setIncomes(incomesData);
      setFixedExpenses(fixedData);
      setVariableExpenses(variableData);
      setGoals(goalsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const addAccount = async (accountData: Omit<Account, "id" | "createdAt">) => {
    const newAccount: Account = {
      ...accountData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...accounts, newAccount];
    setAccounts(updated);
    await DataService.saveAccounts(updated);
  };

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    const updated = accounts.map((acc) =>
      acc.id === id ? { ...acc, ...updates } : acc
    );
    setAccounts(updated);
    await DataService.saveAccounts(updated);
  };

  const deleteAccount = async (id: string) => {
    const updated = accounts.filter((acc) => acc.id !== id);
    setAccounts(updated);
    await DataService.saveAccounts(updated);
  };

  const addCard = async (cardData: Omit<CreditCard, "id" | "createdAt">) => {
    const newCard: CreditCard = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...cards, newCard];
    setCards(updated);
    await DataService.saveCards(updated);
  };

  const updateCard = async (id: string, updates: Partial<CreditCard>) => {
    const updated = cards.map((card) =>
      card.id === id ? { ...card, ...updates } : card
    );
    setCards(updated);
    await DataService.saveCards(updated);
  };

  const deleteCard = async (id: string) => {
    const updated = cards.filter((card) => card.id !== id);
    setCards(updated);
    await DataService.saveCards(updated);
  };

  const addPurchase = async (purchaseData: Omit<Purchase, "id">) => {
    const newPurchase: Purchase = {
      ...purchaseData,
      id: Date.now().toString(),
    };
    const updated = [...purchases, newPurchase];
    setPurchases(updated);
    await DataService.savePurchases(updated);

    const card = cards.find((c) => c.id === newPurchase.cardId);
    if (card) {
      await updateCard(card.id, {
        currentBalance: card.currentBalance + newPurchase.amount,
      });
    }
  };

  const addIncome = async (incomeData: Omit<Income, "id" | "createdAt">) => {
    const newIncome: Income = {
      ...incomeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...incomes, newIncome];
    setIncomes(updated);
    await DataService.saveIncomes(updated);

    if (newIncome.accountId) {
      const account = accounts.find((acc) => acc.id === newIncome.accountId);
      if (account) {
        const updatedAccounts = accounts.map((acc) =>
          acc.id === account.id
            ? { ...acc, balance: acc.balance + newIncome.amount }
            : acc
        );
        setAccounts(updatedAccounts);
        await DataService.saveAccounts(updatedAccounts);
      }
    }
  };

  const addFixedExpense = async (
    expenseData: Omit<FixedExpense, "id" | "createdAt">
  ) => {
    const newExpense: FixedExpense = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...fixedExpenses, newExpense];
    setFixedExpenses(updated);
    await DataService.saveFixedExpenses(updated);
  };

  const updateFixedExpense = async (
    id: string,
    updates: Partial<FixedExpense>
  ) => {
    const expense = fixedExpenses.find((e) => e.id === id);
    const updated = fixedExpenses.map((exp) =>
      exp.id === id ? { ...exp, ...updates } : exp
    );
    setFixedExpenses(updated);
    await DataService.saveFixedExpenses(updated);

    if (updates.isPaid && expense && !expense.isPaid && expense.accountId) {
      const account = accounts.find((acc) => acc.id === expense.accountId);
      if (account) {
        const updatedAccounts = accounts.map((acc) =>
          acc.id === account.id
            ? { ...acc, balance: acc.balance - expense.amount }
            : acc
        );
        setAccounts(updatedAccounts);
        await DataService.saveAccounts(updatedAccounts);
      }
    }
  };

  const addVariableExpense = async (
    expenseData: Omit<VariableExpense, "id" | "createdAt">
  ) => {
    const newExpense: VariableExpense = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...variableExpenses, newExpense];
    setVariableExpenses(updated);
    await DataService.saveVariableExpenses(updated);

    if (newExpense.paymentMethod === "credit" && newExpense.cardId) {
      const card = cards.find((c) => c.id === newExpense.cardId);
      if (card) {
        const updatedCards = cards.map((c) =>
          c.id === card.id
            ? { ...c, currentBalance: c.currentBalance + newExpense.amount }
            : c
        );
        setCards(updatedCards);
        await DataService.saveCards(updatedCards);
      }
    } else if (newExpense.accountId) {
      const account = accounts.find((acc) => acc.id === newExpense.accountId);
      if (account) {
        const updatedAccounts = accounts.map((acc) =>
          acc.id === account.id
            ? { ...acc, balance: acc.balance - newExpense.amount }
            : acc
        );
        setAccounts(updatedAccounts);
        await DataService.saveAccounts(updatedAccounts);
      }
    }
  };

  const addGoal = async (goalData: Omit<FinancialGoal, "id" | "createdAt">) => {
    const newGoal: FinancialGoal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...goals, newGoal];
    setGoals(updated);
    await DataService.saveGoals(updated);
  };

  const updateGoal = async (id: string, updates: Partial<FinancialGoal>) => {
    const updated = goals.map((goal) =>
      goal.id === id ? { ...goal, ...updates } : goal
    );
    setGoals(updated);
    await DataService.saveGoals(updated);
  };

  const refreshData = async () => {
    await loadAllData();
  };

  return (
    <DataContext.Provider
      value={{
        accounts,
        cards,
        purchases,
        incomes,
        fixedExpenses,
        variableExpenses,
        goals,
        loading,
        addAccount,
        updateAccount,
        deleteAccount,
        addCard,
        updateCard,
        deleteCard,
        addPurchase,
        addIncome,
        addFixedExpense,
        updateFixedExpense,
        addVariableExpense,
        addGoal,
        updateGoal,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
