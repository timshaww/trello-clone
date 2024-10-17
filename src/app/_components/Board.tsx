import React, { useEffect, useState } from 'react';
import { Board as BoardType, List as ListType } from '../../lib/utils';
import BoardHeader from './BoardHeader';
import List from './List';
import { useMainContext } from '../_contexts/MainContext';

type BoardProps = {
	board: BoardType;
	setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};

const Board: React.FC<BoardProps> = ({ board, setBoard }) => {
	const { getBoardById } = useMainContext();

	if (!board || !getBoardById(board.id)) {
		return (
			<div className='flex justify-center bg-gradient-to-tl to-trello-backgrounds-snow-to from-trello-backgrounds-snow-from items-center h-full w-full'>
				<div className='bg-trello-card-bg p-3 rounded-md flex items-center justify-center'>
					<h1 className='text-trello-text-p text-2xl text-center'>
						No board found 😔 <br />
					</h1>
				</div>
			</div>
		);
	}

	const [lists, setLists] = useState<ListType[]>(board.lists || []);

	useEffect(() => {
		setBoard((prevBoard) => ({ ...prevBoard, lists }));
	}, [lists]);

	// Add a new list
	const handleAddList = () => {
		const newList = {
			id: Date.now().toString(), // Generate a unique ID
			title: 'New List',
			cards: [],
		};
		setLists([...lists, newList]);
	};

	return (
		<div
			className={`flex flex-col w-full h-full bg-gradient-to-tl from-trello-backgrounds-${board.background}-from to-trello-backgrounds-${board.background}-to`}
		>
			<BoardHeader board={board} setBoard={setBoard} />

			{/* List area with overflow-x-auto to allow horizontal scrolling */}
			<div className='flex flex-row p-3 gap-3 overflow-x-auto'>
				{lists.map((list: ListType, listIndex: number) => (
					<List
						list={list}
						key={list.id || listIndex}
						setList={(updatedList: React.SetStateAction<ListType>) => {
							const newLists = [...lists];
							const newList = typeof updatedList === 'function' ? updatedList(newLists[listIndex]) : updatedList;
							newLists[listIndex] = newList;
							setLists(newLists);
						}}
					/>
				))}

				{/* Button to add a new list */}
				<div
					className='flex items-center justify-center bg-trello-card-bg p-3 rounded-md cursor-pointer min-w-[200px] hover:bg-trello-hover'
					onClick={handleAddList}
				>
					<p className='text-trello-text-p'>+ Add List</p>
				</div>
			</div>
		</div>
	);
};

export default Board;
