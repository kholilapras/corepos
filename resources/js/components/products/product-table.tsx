import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2, Info } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import type { Product } from '@/types';

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    pageIndex: number;
    pageSize: number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    globalFilter: string;
    setGlobalFilter: (filter: string) => void;
    setSelectedProduct: (product: Product) => void;
    setShowModal: (show: boolean) => void;
}

export default function ProductTable({
    products,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    globalFilter,
    setGlobalFilter,
    setSelectedProduct,
    setShowModal,
}: Props) {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'default' | 'destructive'>('default');

    useEffect(() => {
        if (alertMessage) {
            const timeout = setTimeout(() => setAlertMessage(null), 3000);
            return () => clearTimeout(timeout);
        }
    }, [alertMessage]);

    const columns = useMemo<ColumnDef<Product>[]>(() => [
        {
            accessorKey: 'no',
            header: 'NO',
            cell: ({ row }) => pageIndex * pageSize + row.index + 1,
        },
        { accessorKey: 'product_code', header: 'CODE' },
        { accessorKey: 'product_name', header: 'NAME' },
        {
            accessorKey: 'price',
            header: 'PRICE',
            cell: ({ getValue }) => `Rp ${getValue<number>()}`,
        },
        { accessorKey: 'stock', header: 'STOCK' },
        {
            id: 'actions',
            header: () => <div className="text-right">ACTION</div>,
            cell: ({ row }) => (
                <div className="space-x-2 flex justify-end">
                    <Button
                        onClick={() => {
                            setSelectedProduct(row.original);
                            setShowModal(true);
                        }}
                        className="bg-gray-700 hover:bg-gray-800 text-white"
                    >
                        <Info />
                    </Button>
                    <Button asChild className="bg-blue-800 hover:bg-blue-500 text-white">
                        <Link href={route('products.edit', row.original.id)}>
                            <Pencil />
                        </Link>
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                            if (confirm('Are you sure?')) {
                                router.delete(route('products.destroy', row.original.id), {
                                    onSuccess: () => {
                                        setAlertMessage('Product deleted successfully.');
                                        setAlertType('default');
                                    },
                                    onError: () => {
                                        setAlertMessage('Failed to delete the product.');
                                        setAlertType('destructive');
                                    },
                                });
                            }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        <Trash2 />
                    </Button>
                </div>
            ),
        },
    ], [pageIndex, pageSize]);

    const table = useReactTable({
        data: products.data,
        columns,
        manualPagination: true,
        pageCount: products.last_page,
        state: { pagination: { pageIndex, pageSize }, globalFilter },
        onPaginationChange: (updater) => {
            const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(next.pageIndex);
            setPageSize(next.pageSize);
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            {alertMessage && (
                <div className="mb-4">
                    <Alert variant={alertType}>
                        <AlertTitle>{alertType === 'destructive' ? 'Error' : 'Success'}</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
            <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-6 py-3 text-left text-xs">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-white text-black dark:bg-neutral-950 dark:text-white divide-y divide-gray-200 dark:divide-gray-700">
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className={`px-6 py-4 whitespace-nowrap ${cell.column.id === 'actions' ? 'text-right' : ''}`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-10 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <Button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
                    Previous
                </Button>
                <span className="px-4 py-2 text-sm">Page {pageIndex + 1} of {products.last_page}</span>
                <Button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
                    Next
                </Button>
            </div>
        </>
    );
}
