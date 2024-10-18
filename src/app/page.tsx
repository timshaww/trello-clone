import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push('/b/board-1');
	}, []);
	return <div className='flex flex-row w-screen h-screen items-center justify-center'></div>;
}
