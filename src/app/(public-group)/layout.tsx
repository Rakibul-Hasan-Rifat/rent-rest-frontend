import { Navbar } from '@/app/(public-group)/_components/navbar';
import Footer from './_components/footer';

const PublicLayout = ({ children }: LayoutProps<"/">) => {
    return (
        <div>
            <Navbar />
            <main className="flex flex-col flex-1 items-center justify-center bg-zinc-200 font-sans dark:bg-black">
                <div className="flex flex-1 gap-14 w-full max-w-5xl flex-col items-center justify-between p-8 md:p-12 lg:p-16 bg-white dark:bg-black sm:items-start">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
