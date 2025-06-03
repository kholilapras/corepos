import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import Form from './form';
import type { BreadcrumbItem } from '@/types';

const breadcrumbItems: BreadcrumbItem[] = [
    { title: 'Products', href: route('products.index') },
    { title: 'Add Product', href: '#' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        product_code: '',
        product_name: '',
        price: 0,
        stock: 0,
    });

    const handleSubmit = () => {
        post(route('products.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbItems}>
            <Head title="Add Product" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                <h1 className="text-2xl font-bold mb-6">Add Product</h1>
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
