export const useFilter = () => {
    const getInitialSelections = (categories) => {
        const selections = [];
        let currentCategories = categories;

        while (currentCategories && currentCategories.length > 0) {
            const firstCategory = currentCategories[0];
            selections.push(firstCategory);
            currentCategories = firstCategory.value;
        }

        return selections;
    };

    const reorderCategories = (tree, order) => {
        const orderMap = new Map(order.map((item, index) => [item.name, index+ 1]));
        return [...tree].sort((a, b) => (orderMap.get(a.label) || Infinity) - (orderMap.get(b.label) || Infinity));
    };



    return {
        getInitialSelections,
        reorderCategories,
    }
}