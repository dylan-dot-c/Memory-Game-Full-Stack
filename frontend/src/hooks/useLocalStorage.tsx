// localStorage hook to interact with localStorage declaratively

interface LocalStorage<T> {
    getStoredData: () => T | null;
    setData: (data: T) => void;
    removeItem: () => void;
}

const useLocalStorage = <T,>(key: string): LocalStorage<T> => {
    function getStoredData() {
        const data = localStorage.getItem(key);

        if (data == null) return null;

        return JSON.parse(data);
    }

    function setData(data: T) {
        const stringedItem = JSON.stringify(data);

        localStorage.setItem(key, stringedItem);
    }

    function removeItem() {
        localStorage.removeItem(key);
    }

    return { getStoredData, setData, removeItem };
};

export default useLocalStorage;
