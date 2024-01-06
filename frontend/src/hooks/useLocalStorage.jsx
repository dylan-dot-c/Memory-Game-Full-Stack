const useLocalStorage = (item) => {
    function getStoredData() {
        const data = localStorage.getItem(item);

        if (data == null) return null;

        return JSON.parse(data);
    }

    function setData(data) {
        const stringedItem = JSON.stringify(data);

        localStorage.setItem(item, stringedItem);
    }

    function removeItem() {
        localStorage.removeItem(item);
    }

    return { getStoredData, setData, removeItem };
};

export default useLocalStorage;
