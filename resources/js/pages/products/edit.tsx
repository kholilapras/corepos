import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Form from './form';

interface Product {
    id: number;
    product_code: string;
    product_name: string;
    price: number;
    stock: number;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        product_code: product.product_code,
        product_name: product.product_name,
        price: product.price,
        stock: product.stock,
    });

    const handleSubmit = () => {
        put(route('products.update', product.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Product" />
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
                <Form
                    data={data}
                    setData={setData}
                    onSubmit={handleSubmit}
                    processing={processing}
                    errors={errors}
                />
            </div>
        </AppLayout>
    );
}
