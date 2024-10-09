import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Board as BoardType, List as ListType } from '../../lib/utils'; // Assume the types are imported
import List from './List';
import BoardHeader from './BoardHeader';

type BoardProps = {
	board: BoardType;
	setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};

const Board: React.FC<BoardProps> = ({ board, setBoard }) => {
	const [lists, setLists] = useState(board.lists);

	return (
		<div
			className={`flex flex-col w-full h-full bg-gradient-to-tl from-trello-backgrounds-${board.background}-from to-trello-backgrounds-${board.background}-to`}
		>
			<BoardHeader board={board} setBoard={setBoard} />
			<div className='flex flex-row p-3 gap-3'>
				{lists.map((list: ListType, listIndex: number) => (
					<List
						list={list}
						setList={(updatedList: React.SetStateAction<ListType>) => {
							const newLists = [...lists];
							const newList = typeof updatedList === 'function' ? updatedList(newLists[listIndex]) : updatedList;
							newLists[listIndex] = newList;
							setLists(newLists);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default Board;
