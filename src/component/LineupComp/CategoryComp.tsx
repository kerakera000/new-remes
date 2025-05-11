import React, { useEffect, useState } from "react";
import ItemComp from "./Category/ItemComp";
import { getProductsByCategory } from "../../lib/firebaseService";

interface CategoryCompProps {
    title: string;
    category: string;
}

interface Product {
    id: string;
    stripe_metadata_categories?: string;
    name?: string;
    description?: string;
    price?: number | undefined;
    images?: string[];
    [key: string]: unknown;
}

const CategoryComp: React.FC<CategoryCompProps> = ({ title, category }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('検索カテゴリー:', category);
                const fetchedProducts = await getProductsByCategory(category);
                console.log('取得したプロダクト:', fetchedProducts);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div className="CategoryComp">
            <h2 className="CategoryComp__title">{title}</h2>
            <div className="CategoryComp__content">
                {products.map((product) => (
                    <ItemComp 
                        key={product.id} 
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        images={product.images}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryComp;