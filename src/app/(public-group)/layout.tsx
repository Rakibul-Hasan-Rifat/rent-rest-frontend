import { Navbar } from '@/components/module/navbar';
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
