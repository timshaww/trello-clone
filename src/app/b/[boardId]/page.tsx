'use client';

import { exampleBoard } from '@/lib/exampleInfo';
import { useState, useEffect } from 'react';
import Board from '../../_components/Board';
import Menu from '../../_components/Menu';
import Sidebar from '../../_components/Sidebar';
import { MainProvider, useMainContext } from '../../_contexts/MainContext';
import { useParams } from 'next/navigation'; // Updated import

const Page = () => {
	const { boardId } = useParams<{ boardId: string }>(); // Use useParams to get boardId
	const [board, setBoard] = useState(exampleBoard);
	const { getBoardById, setBoards, boards } = useMainContext();

	useEffect(() => {
		if (boardId) {
			setBoard(getBoardById(boardId)!);
		}
	}, [boardId, getBoardById]);

	useEffect(() => {
		if (board) {
			const updatedBoards = boards.map((b) => (b.id === board.id ? board : b));
			setBoards(updatedBoards);
		}
	}, [board]);

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
