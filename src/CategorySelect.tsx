import {useEffect, useState} from "react";

const CategorySelect = ({ categories, onCategoryChange, level }) => {
    const [selectedCategory, setSelectedCategory] = useState(
        categories[0]?.id || null
    );

    useEffect(() => {
        if (categories.length > 0) {
            console.log('temp')
            onCategoryChange(categories[0], level);
        }
    }, [categories, level, onCategoryChange]);

    const handleChange = (e) => {
        const categoryId = parseInt(e.target.value);
        const category = categories.find((cat) => cat.id === categoryId);
        setSelectedCategory(categoryId);
        onCategoryChange(category, level);
    };

    return (
        <div>
            <select value={selectedCategory} onChange={handleChange}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.label}
                    </option>
                ))}
            </select>
            {selectedCategory &&
                categories.find((cat) => cat.id === selectedCategory)?.value.length >
                0 && (
                    <CategorySelect
                        categories={
                            categories.find((cat) => cat.id === selectedCategory).value
                        }
                        onCategoryChange={onCategoryChange}
                        level={level + 1}
                    />
                )}
        </div>
    );
};


export default CategorySelect;