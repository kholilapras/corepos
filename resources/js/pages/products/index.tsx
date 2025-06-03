import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Plus, Pencil, Trash2, Info } from 'lucide-react';
import ProductTable from '../../components/products/product-table';
//import DetailsModal from '@/components/products/details-modal';
import DetailsModal from '../../components/products/details-modal';
import type { Product, BreadcrumbItem } from '@/types';

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        per_page: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Products', href: route('products.index') },
];

export default function Index({ products, filters }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [globalFilter, setGlobalFilter] = useState(filters.search ?? '');
    const [pageIndex, setPageIndex] = useState(products.current_page - 1);
    const [pageSize, setPageSize] = useState(filters.per_page);

    useEffect(() => {
        router.visit(route('products.index'), {
            data: {
                page: pageIndex + 1,
                per_page: pageSize,
                search: globalFilter,
            },
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    }, [pageIndex, pageSize, globalFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product List" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <input
                            type="text"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Search..."
                            className="w-full sm:w-64 px-4 py-2 text-sm border rounded-md shadow-sm h-[42px]"
                        />
                        <Button
                            asChild
                            className="bg-green-600 hover:bg-green-800 text-white w-full sm:w-auto h-[42px] px-4"
                        >
                            <Link href={route('products.create')} className="flex items-center justify-center gap-1">
                                <Plus className="w-4 h-4" /> Add Product
                            </Link>
                        </Button>
                    </div>
                </div>

                <ProductTable
                    products={products}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    setSelectedProduct={setSelectedProduct}
                    setShowModal={setShowModal}
                />

                {selectedProduct && (
                    <DetailsModal
                        open={showModal}
                        onClose={() => setShowModal(false)}
                        product={selectedProduct}
                    />
                )}
            </div>
        </AppLayout>
    );
}
