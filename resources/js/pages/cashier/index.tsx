import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Trash2 } from 'lucide-react';


interface Product {
    id: number;
    product_code: string;
    product_name: string;
    price: number;
    stock: number;
}

interface Props {
    products: Product[];
}

interface CartItem {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
}

export default function Cashier({ products }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cashReceived, setCashReceived] = useState<number>(0);

    const { data, setData, post } = useForm({
        items: [] as { product_id: number; quantity: number }[],
        cash: 0,
    });

    const breadcrumbs = [
        { title: 'Cashier', href: route('cashier.index') },
    ];

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product_id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.product_id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prevCart,
                {
                    product_id: product.id,
                    name: product.product_name,
                    price: product.price,
                    quantity: 1,
                },
            ];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter(item => item.product_id !== productId));
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Cart is empty.');
            return;
        }

        setData({
            items: cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
            })),
            cash: cashReceived,
        });

        post(route('cashier.store'));
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const change = cashReceived - totalPrice;

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cashier" />
            <div className="p-6 w-full">
                <h1 className="text-3xl font-bold mb-6">Cashier</h1>

                {/* Search Bar */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Search Product</h2>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                {/* Search Result */}
                {searchTerm && (
                    <div className="space-y-3 mb-10">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex justify-between items-center border rounded-lg p-3 bg-white dark:bg-neutral-900 shadow-sm"
                                >
                                    <div>
                                        <div className="font-medium">{product.product_name}</div>
                                        <div className="text-sm text-gray-500">Rp {product.price}</div>
                                    </div>
                                    <Button onClick={() => addToCart(product)}>Add</Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">No products found.</p>
                        )}
                    </div>
                )}

                {/* Cart */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Cart</h2>
                    <div className="border rounded-lg p-4 bg-white shadow-sm dark:bg-neutral-900">
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-sm">No items in cart.</p>
                        ) : (
                            <ul className="space-y-2">
                                {cart.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center border-b pb-1">
                                        <span>{item.name} × {item.quantity}</span>
                                        <div className="flex items-center space-x-2">
                                            <span>Rp {item.price * item.quantity}</span>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeFromCart(item.product_id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>

                                        </div>
                                    </li>
                                ))}
                                <li className="flex justify-between font-bold pt-3 border-t">
                                    <span>Total</span>
                                    <span>Rp {totalPrice}</span>
                                </li>
                            </ul>
                        )}

                        {/* Cash Input */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1">Cash Received (Rp)</label>
                            <input
                                type="number"
                                min={0}
                                value={cashReceived}
                                onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                        {/* Change */}
                        <div className="flex justify-between mt-4 font-medium">
                            <span>Change:</span>
                            <span className={change < 0 ? 'text-red-500' : ''}>
                                Rp {change < 0 ? 0 : change}
                            </span>
                        </div>

                        <Button
                            className="w-full mt-4"
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || change < 0}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
