import {useEffect, useState} from "react";
import {Select} from "antd";

const CategorySelect = ({ categories, initialSelections, onSelectionChange, level = 0 }) => {
    const [selectedCategory, setSelectedCategory] = useState(initialSelections[level]);

    useEffect(() => {
        setSelectedCategory(initialSelections[level]);
    }, [initialSelections, level]);

    const handleChange = (event) => {
        const selectedId = event;
        const category = categories.find(cat => cat.id === Number(selectedId));
        setSelectedCategory(category);
        onSelectionChange(level, category);
    };

    return (
        <div className="select-container">
            <Select
                style={{width: "250px", marginRight: "20px"}}
                value={selectedCategory ? selectedCategory.id : undefined}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <Select.Option key={category.id} value={category.id}>
                        {category.label}
                    </Select.Option>
                ))}
            </Select>
            {selectedCategory && selectedCategory.value.length > 0 && (
                <CategorySelect
                    categories={selectedCategory.value}
                    initialSelections={initialSelections}
                    onSelectionChange={onSelectionChange}
                    level={level + 1}
                />
            )}
        </div>
    );
};

export default CategorySelect;