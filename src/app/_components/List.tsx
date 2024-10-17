import { Ellipsis, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { Card as CardType, List as ListType } from '../../lib/utils';
import Card from './Card';
import EditCard from './EditCard';

interface ListProps {
	list: ListType;
	setList: React.Dispatch<React.SetStateAction<ListType>>;
}

const List: React.FC<ListProps> = ({ list, setList }) => {
	const [cards, setCards] = useState(list.cards);

	const newCardInit: CardType = {
		id: 'new',
		title: '',
		description: '',
		labels: [],
		watchers: [],
		checklist: null,
		activities: [],
		dueDate: new Date(),
		members: [],
	};

	const [newCard, setNewCard] = useState(newCardInit);

	// This function will update the card and ensure we update the list without causing an infinite loop.
	const updateListWithCards = (updatedCards: CardType[]) => {
		setCards(updatedCards); // Update local cards state
		setList((prevList) => ({ ...prevList, cards: updatedCards })); // Sync with the parent list
	};

	// Handle adding a new card
	const handleAddCard = () => {
		if (newCard.title.trim() !== '') {
			const newCardWithId = { ...newCard, id: Date.now().toString() };
			updateListWithCards([...cards, newCardWithId]); // Use the function to update both local and parent state
			setNewCard(newCardInit); // Reset the new card form
		}
	};

	// Handle removing a card
	const handleRemoveCard = (cardId: string) => {
		const updatedCards = cards.filter((card) => card.id !== cardId);
		updateListWithCards(updatedCards); // Update both local and parent state
	};

	return (
		<div className='flex flex-col bg-trello-list-bg p-2 gap-2 rounded-xl h-fit w-[272px] min-w-[272px]'>
			<div className='flex flex-row justify-between h-8 items-center'>
				<h2 className='mx-2 text-trello-list-text font-semibold overflow-hidden'>{list.title}</h2>
				<div className='size-8 hover:bg-trello-hover flex items-center justify-center rounded cursor-pointer'>
					<Ellipsis className='text-trello-list-text size-4' />
					{/* TODO: Add menu */}
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				{cards.map((card, cardIndex) => (
					<div key={card.id}>
						<Card
							onSave={handleAddCard}
							key={cardIndex}
							card={card}
							onRemove={() => handleRemoveCard(card.id)}
							setCard={(updatedCard: React.SetStateAction<CardType>) => {
								const newCards = [...cards];
								const updatedCards = typeof updatedCard === 'function' ? updatedCard(newCards[cardIndex]) : updatedCard;
								newCards[cardIndex] = updatedCards;
								updateListWithCards(newCards); // Sync with parent state
							}}
							listTitle={list.title}
						/>
					</div>
				))}
			</div>

			{/* Add Card Section */}
			<EditCard onRemove={() => handleRemoveCard(newCard.id)} card={newCard} listTitle={list.title} setCard={setNewCard} onSave={handleAddCard}>
				<button className='flex flex-row w-full h-8 items-center rounded hover:bg-trello-hover'>
					<Plus className='text-trello-list-text size-4 mx-2' />
					<h3 className='text-trello-list-text text-sm font-semibold'>Add Card</h3>
				</button>
			</EditCard>
		</div>
	);
};

export default List;
