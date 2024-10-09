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

	const handleOnDragEnd = (result: any) => {
		if (!result.destination) return;

		// Create a copy of the current lists
		const updatedLists = Array.from(lists);
		// Remove the dragged item from its original position
		const [reorderedList] = updatedLists.splice(result.source.index, 1);
		// Insert it at the new position
		updatedLists.splice(result.destination.index, 0, reorderedList);

		// Update state
		setLists(updatedLists);
		const { destination, source, draggableId, type } = result;

		if (!destination) return;

		if (type === 'list') {
			// Handle list reordering
			const updatedLists = Array.from(lists);
			// Remove the dragged item from its original position
			const [reorderedList] = updatedLists.splice(result.source.index, 1);
			// Insert it at the new position
			updatedLists.splice(result.destination.index, 0, reorderedList);

			// Update state
			setLists(updatedLists);
		} else if (type === 'card') {
			const sourceListId = source.droppableId;
			const destinationListId = destination.droppableId;

			// Avoid unnecessary state updates
			if (sourceListId === destinationListId && source.index === destination.index) {
				return;
			}

			// Find the source and destination lists
			const sourceListIndex = lists.findIndex((list) => list.id === sourceListId);
			const destinationListIndex = lists.findIndex((list) => list.id === destinationListId);

			const sourceList = lists[sourceListIndex];
			const destinationList = lists[destinationListIndex];

			// Create copies of the cards arrays
			const sourceCards = Array.from(sourceList.cards);
			const destinationCards = sourceListId === destinationListId ? sourceCards : Array.from(destinationList.cards);

			// Move the card
			const [movedCard] = sourceCards.splice(source.index, 1);
			destinationCards.splice(destination.index, 0, movedCard);

			// Create updated list objects
			const updatedSourceList = {
				...sourceList,
				cards: sourceCards,
			};
			const updatedDestinationList = {
				...destinationList,
				cards: destinationCards,
			};

			// Update the lists array
			const updatedLists = Array.from(lists);
			updatedLists[sourceListIndex] = updatedSourceList;
			updatedLists[destinationListIndex] = updatedDestinationList;

			setLists(updatedLists);
		}
	};

	return (
		<div
			className={`flex flex-col w-full h-full bg-gradient-to-tl from-trello-backgrounds-${board.background}-from to-trello-backgrounds-${board.background}-to`}
		>
			<BoardHeader board={board} setBoard={setBoard} />
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='board-lists' direction='horizontal' type='list'>
					{(provided) => (
						<ul className='flex flex-row p-3 gap-3' {...provided.droppableProps} ref={provided.innerRef}>
							{lists.map((list: ListType, listIndex: number) => (
								<Draggable key={list.id} draggableId={list.id} index={listIndex}>
									{(provided) => (
										<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
											<List
												list={list}
												setList={(updatedList: React.SetStateAction<ListType>) => {
													const newLists = [...lists];
													const newList =
														typeof updatedList === 'function' ? updatedList(newLists[listIndex]) : updatedList;
													newLists[listIndex] = newList;
													setLists(newLists);
												}}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default Board;
