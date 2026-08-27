import { Navbar } from '@/app/(public-group)/_components/navbar';

const PublicLayout = ({children}: LayoutProps<"/">) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default PublicLayout;
