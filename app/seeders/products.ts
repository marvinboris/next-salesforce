import { Product } from "../models";
import { ProductInterface } from "../models/product";

const products: ProductInterface[] = [
    { price: 6400, title: 'Packets of Nido' },
    { price: 1400, title: 'Mambo chocolate' },
    { price: 15000, title: 'Spaghetti Toti Roti' },
    { price: 7700, title: 'Ovaltine Martina 400mg' },
    { price: 80000, title: 'Martina Chocolate 1kg' },
    { price: 4000, title: 'White Chocolate (Vanila)' },
    { price: 5000, title: 'Cocoa Butter with peanuts' },
]

export default async function productsSeed() {
    await Product.insertMany(products)
}