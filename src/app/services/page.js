// Add the "use client" directive at the top
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ServicePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/services/supply-chain-management');
    }, [router]);

    return null; // You can return a loading message or spinner if you'd like
};

export default ServicePage;
