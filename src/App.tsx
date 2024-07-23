import { useState } from 'react';
 import initialCategoriesTree from "./categories_tree.json"
import {Button, Input, Spin} from "antd";
import {axiosRequest} from "./api/axios.ts";
import {useFilter} from "./helpers.ts";
import CategorySelect from "./features/TreeForm";





const App = () => {
    // парсим данные
    const { getInitialSelections, reorderCategories } = useFilter()
    const [data, setData] = useState(initialCategoriesTree);
    const [selections, setSelections] = useState(getInitialSelections(initialCategoriesTree));
    const [apiData, setApiData] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: ""
    })
    const [isLoader, setIsLoader] = useState(false)

    const annotationClick = () => {
        setIsLoader(true)
        axiosRequest.post('/annotate', {
            ...form,
            params: { top_k: 10 }
        })
            .then(response => {
                const apiResponse = response.data;
                setApiData(apiResponse);
                const updatedData = reorderCategories(initialCategoriesTree, apiResponse.category);
                setData(updatedData);
                setSelections(getInitialSelections(updatedData));
            })
            .catch(error => {
                console.error('Error fetching data from API', error);
            }).finally(() => {
                setIsLoader(false)
        });
    }

    const handleSelectionChange = (level, selectedCategory) => {
        const newSelections = selections.slice(0, level + 1);
        newSelections[level] = selectedCategory;

        let currentCategories = selectedCategory.value;
        while (currentCategories && currentCategories.length > 0) {
            const firstCategory = currentCategories[0];
            newSelections.push(firstCategory);
            currentCategories = firstCategory.value;
        }
        setSelections(newSelections);
    };

    return (
        <div className="app-container">
            <Input onChange={e => setForm({...form, name: e.target.value})} type="text" placeholder="name" style={{width: "350px", marginBottom: "20px"}}/>
            <Input onChange={e => setForm({...form, description: e.target.value})} type="text" placeholder="description" style={{width: "350px"}}/>
                {apiData && (
                    <div style={{display: "flex", margin: "30px 0"}}>
                        <CategorySelect
                            categories={data}
                            initialSelections={selections}
                            onSelectionChange={handleSelectionChange}
                        />
                    </div>
                )}
            {isLoader && <Spin style={{marginTop: "30px"}} />}
            <Button type="primary" disabled={!form.name && !form.description} onClick={annotationClick} style={{marginTop: "20px"}}>Pre annotate</Button>
        </div>
    );
};

export default App;
