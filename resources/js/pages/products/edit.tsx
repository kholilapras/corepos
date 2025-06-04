import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Form from './form';
import type { BreadcrumbItem } from '@/types';

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

const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Products', href: route('products.index') },
    { title: 'Edit Product', href: '#' },
];

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
        <AppLayout breadcrumbs={breadcrumbItems}>
            <Head title="Edit Product" />
            <div className="w-full px-6 py-10">
                <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
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
