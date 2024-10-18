'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push('/b/board-1');
	}, [router]);

	return <div className='flex flex-row w-screen h-screen items-center justify-center'></div>;
}
