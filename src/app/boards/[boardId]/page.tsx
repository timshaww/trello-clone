'use client';

import { exampleBoard } from '@/lib/exampleInfo';
import { useState, useEffect } from 'react';
import Board from '../../_components/Board';
import Menu from '../../_components/Menu';
import Sidebar from '../../_components/Sidebar';
import { MainProvider, useMainContext } from '../../_contexts/MainContext';
import { useParams } from 'next/navigation'; // Updated import

const Page = () => {
	const { boardId } = useParams(); // Use useParams to get boardId
	const [board, setBoard] = useState(exampleBoard);
	const { getBoardById } = useMainContext();

	useEffect(() => {
		if (boardId && typeof boardId === 'string') {
			const fetchedBoard = getBoardById(boardId);
			if (fetchedBoard) {
				setBoard(fetchedBoard);
			}
		}
	}, [boardId, getBoardById]);

	return (
		<>
			<div className='flex flex-col w-screen h-screen'>
				<div className='w-full h-full flex flex-row'>
					<Sidebar />
					<Board board={board} setBoard={setBoard} />
					<Menu />
				</div>
			</div>
			<div>{JSON.stringify(board)}</div>
		</>
	);
};

export default Page;
