import Navbar from 'components/ui/Navbar';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <Navbar />
                <main className="flex flex-1 flex-col">{children}</main>
            </div>
        </>
    );
}
