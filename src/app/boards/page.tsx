'use client';

import Sidebar from '../_components/Sidebar';
import Board from '../_components/Board';
import Menu from '../_components/Menu';
import BoardHeader from '../_components/BoardHeader';
import NavBar from '../_components/NavBar';
import { exampleBoard } from '@/lib/exampleInfo';
import { useState } from 'react';

const page = () => {
	const [board, setBoard] = useState(exampleBoard);

	return (
		<div className='flex flex-col w-screen h-screen'>
			<NavBar />
			<div className='w-full h-full flex flex-row'>
				<Sidebar />
				<Board board={board} setBoard={setBoard} />
				<Menu />
			</div>
		</div>
	);
};

export default page;
