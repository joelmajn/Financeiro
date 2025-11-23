import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  USER: "@neowallet:user",
  ACCOUNTS: "@neowallet:accounts",
  CARDS: "@neowallet:cards",
  INCOMES: "@neowallet:incomes",
  FIXED_EXPENSES: "@neowallet:fixed_expenses",
  VARIABLE_EXPENSES: "@neowallet:variable_expenses",
  GOALS: "@neowallet:goals",
  ONBOARDING_COMPLETED: "@neowallet:onboarding_completed",
  PIN: "@neowallet:pin",
};

export async function saveData<T>(key: string, data: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data:", error);
    throw error;
  }
}

export async function getData<T>(key: string): Promise<T | null> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting data:", error);
    return null;
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing data:", error);
    throw error;
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing data:", error);
    throw error;
  }
}

export { STORAGE_KEYS };
