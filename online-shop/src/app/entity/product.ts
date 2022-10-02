import { ProductCategory } from "./product-category";

export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    unitsInStock: number;
    category: ProductCategory;
    producer: string;
}
