import AsyncStorage from '@react-native-async-storage/async-storage';

export async function queryDataSaved(storageKey) {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey)
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
        throw error;
    }
}

export async function updateDataSaved(storageKey, value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storageKey, jsonValue)
        return 
    } catch (error) {
        throw error;
    }
}