interface LocalStorage<T> {
    getStoredData: () => T | null;
    setData: (data: T) => void;
    removeItem: () => void;
}

const useLocalStorage = <T,>(item: string): LocalStorage<T> => {
    function getStoredData() {
        const data = localStorage.getItem(item);

        if (data == null) return null;

        return JSON.parse(data);
    }

    function setData(data: T) {
        const stringedItem = JSON.stringify(data);

        localStorage.setItem(item, stringedItem);
    }

    function removeItem() {
        localStorage.removeItem(item);
    }

    return { getStoredData, setData, removeItem };
};

export default useLocalStorage;
