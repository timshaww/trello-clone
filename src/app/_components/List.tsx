import React, { useEffect } from 'react';
import { Ellipsis, Plus } from 'lucide-react';
import Card from './Card';
import { Card as CardType, List as ListType } from '../../lib/utils';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import EditCard from './EditCard';

interface ListProps {
	list: ListType;
	setList: React.Dispatch<React.SetStateAction<ListType>>;
}

const List: React.FC<ListProps> = ({ list, setList }) => {
	const [cards, setCards] = React.useState(list.cards);

	const newCardInit: CardType = {
		id: 'new',
		title: '',
		description: '',
		labels: [],
		watchers: [],
		checklist: null,
		activities: [],
		dueDate: '',
		members: [],
	};

	const [newCard, setNewCard] = React.useState(newCardInit);

	useEffect(() => {
		setList((prevList) => ({ ...prevList, cards }));
	}, [cards]);

	return (
		<div className='flex flex-col bg-trello-list-bg p-2 gap-2 rounded-xl h-fit w-[272px]'>
			<div className='flex flex-row justify-between h-8 items-center'>
				<h2 className='mx-2 text-trello-list-text font-semibold overflow-hidden'>{list.title}</h2>
				{/* TODO: Make Input */}
				<div className='size-8 hover:bg-trello-hover flex items-center justify-center rounded cursor-pointer'>
					<Ellipsis className='text-trello-list-text size-4' />
					{/* TODO: Add menu */}
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				{cards.map((card, cardIndex) => (
					<div key={card.id}>
						<Card
							key={cardIndex}
							card={card}
							setCard={(updatedCard: React.SetStateAction<CardType>) => {
								const newCards = [...cards];
								const updatedCards = typeof updatedCard === 'function' ? updatedCard(newCards[cardIndex]) : updatedCard;
								newCards[cardIndex] = updatedCards;
								setCards(newCards);
							}}
							listTitle={list.title}
						/>
					</div>
				))}
			</div>
			<EditCard card={newCard} listTitle={list.title} setCard={setNewCard}>
				<button className='flex flex-row w-full h-8 items-center rounded hover:bg-trello-hover'>
					<Plus className='text-trello-list-text size-4 mx-2' />
					<h3 className='text-trello-list-text text-sm font-semibold'>Add Card</h3>
				</button>
			</EditCard>
		</div>
	);
};

export default List;
