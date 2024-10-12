'use client';

import { exampleBoard } from '@/lib/exampleInfo';
import { useState } from 'react';
import Board from '../_components/Board';
import Menu from '../_components/Menu';
import Sidebar from '../_components/Sidebar';
import { MainProvider } from '../_contexts/MainContext';

const page = () => {
	const [board, setBoard] = useState(exampleBoard);

	return (
		<MainProvider>
			<div className='flex flex-col w-screen h-screen'>
				{/* <NavBar /> */}
				<div className='w-full h-full flex flex-row'>
					<Sidebar />
					<Board board={board} setBoard={setBoard} />
					<Menu />
				</div>
			</div>
		</MainProvider>
	);
};

export default page;
