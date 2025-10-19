import { Suspense } from 'react';
import { Dashboard } from '@/components/dashboard';
import { Loader2 } from 'lucide-react';

function DashboardLoading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <Dashboard />
        </Suspense>
    );
}
