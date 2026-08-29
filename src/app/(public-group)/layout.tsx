import { Navbar } from '@/app/(public-group)/_components/navbar';
import Footer from './_components/footer';

const PublicLayout = ({children}: LayoutProps<"/">) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default PublicLayout;
