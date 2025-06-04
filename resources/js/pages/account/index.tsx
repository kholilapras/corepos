import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('en');

const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD MMMM YYYY | HH:mm:ss');
};


interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Account',
        href: '/account',
    },
];

export default function ListAccount() {
    const { users = [] } = usePage().props as { users?: User[] };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List Account" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="overflow-x-auto rounded-xl border">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-800 text-white dark:bg-gray-100 dark:text-black">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Created at</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Updated at</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-black dark:bg-neutral-950 dark:text-white divide-y divide-gray-200 dark:divide-gray-700">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(user.created_at)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(user.updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
