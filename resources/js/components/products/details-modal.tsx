import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

dayjs.locale('id');

const formatDate = (dateString: string) =>
    dayjs(dateString).format('DD MMMM YYYY | HH:mm:ss');

interface ModalProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

export default function DetailsModal({ open, onClose, product }: ModalProps) {
    if (!open || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-2xl border border-white/20 dark:border-neutral-700">
                <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                    Product Details
                </h2>
                <div className="space-y-2 text-gray-700 dark:text-gray-200">
                    <p><strong>Code: </strong> {product.product_code}</p>
                    <p><strong>Name: </strong> {product.product_name}</p>
                    <p><strong>Stock: </strong> {product.stock}</p>
                    <p><strong>Price: </strong> Rp {product.price.toLocaleString('id-ID')}</p>
                    <br></br>
                    <p><strong>Created At:</strong> {formatDate(product.created_at)}</p>
                    <p><strong>Updated At:</strong> {formatDate(product.updated_at)}</p>
                </div>
                <div className="text-right mt-6">
                    <Button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
