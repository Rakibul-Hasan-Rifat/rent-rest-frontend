import { Navbar } from '@/app/(public-group)/_components/navbar';
import { HTMLAttributes } from 'react';



const PublicLayout = ({children}: LayoutProps<"/">) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default PublicLayout;
