import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Props {
    data: {
        product_code: string;
        product_name: string;
        price: number;
        stock: number;
    };
    setData: (key: string, value: any) => void;
    onSubmit: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function Form({ data, setData, onSubmit, processing, errors }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'price' || name === 'stock') {
            setData(name, Number(value));
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">

            <form
                onSubmit={handleSubmit}
                className="w-full bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-md dark:shadow-lg space-y-6 transition-colors"
            >
                <div className="grid gap-2">
                    <Label htmlFor="product_code">Product Code</Label>
                    <Input
                        id="product_code"
                        name="product_code"
                        value={data.product_code}
                        onChange={handleChange}
                        required
                        placeholder="Enter product code"
                        className="w-full"
                    />
                    {errors.product_code && (
                        <span className="text-red-500 text-sm">{errors.product_code}</span>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="product_name">Product Name</Label>
                    <Input
                        id="product_name"
                        name="product_name"
                        value={data.product_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter product name"
                        className="w-full"
                    />
                    {errors.product_name && (
                        <span className="text-red-500 text-sm">{errors.product_name}</span>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        value={data.price}
                        onChange={handleChange}
                        required
                        placeholder="Enter product price"
                        className="w-full"
                    />
                    {errors.price && (
                        <span className="text-red-500 text-sm">{errors.price}</span>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                        id="stock"
                        name="stock"
                        type="number"
                        value={data.stock}
                        onChange={handleChange}
                        required
                        placeholder="Enter product stock"
                        className="w-full"
                    />
                    {errors.stock && (
                        <span className="text-red-500 text-sm">{errors.stock}</span>
                    )}
                </div>

                <Button type="submit" disabled={processing} className="w-full">
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </form>
        </div>
    );
}
