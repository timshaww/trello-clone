import React, { useEffect } from 'react';
import { Ellipsis, Plus } from 'lucide-react';
import Card from './Card';
import { Card as CardType, List as ListType } from '../../lib/utils';
import EditCard from './EditCard';

interface ListProps {
	list: ListType;
	setList: React.Dispatch<React.SetStateAction<ListType>>;
}

const List: React.FC<ListProps> = ({ list, setList }) => {
	const [cards, setCards] = React.useState(list.cards);

	// Initialize the new card template
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

	const [newCard, setNewCard] = React.useState(newCardInit);

	// Sync the local card state with the list whenever the cards are updated
	useEffect(() => {
		setList((prevList) => ({ ...prevList, cards }));
	}, [cards]);

	// Function to add a new card to the list
	const handleAddCard = () => {
		if (newCard.title.trim() !== '') {
			const newCardWithId = { ...newCard, id: Date.now().toString() }; // Assign a unique id based on timestamp
			setCards((prevCards) => [...prevCards, newCardWithId]); // Add the new card to the existing list of cards
			setNewCard(newCardInit); // Reset the newCard state after adding
		}
	};

	// Function to remove a card by id
	const handleRemoveCard = (cardId: string) => {
		setCards((prevCards) => prevCards.filter((card) => card.id !== cardId)); // Filter out the card by id
	};

	return (
		<div className='flex flex-col bg-trello-list-bg p-2 gap-2 rounded-xl h-fit w-[272px]'>
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
							onSave={handleAddCard} // Pass onSave to the card component
							key={cardIndex}
							card={card}
							onRemove={() => handleRemoveCard(card.id)} // Pass handleRemoveCard to each card
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

			{/* Add Card Section */}
			<EditCard
				onRemove={() => handleRemoveCard(newCard.id)} // Remove the new card when canceling
				card={newCard}
				listTitle={list.title}
				setCard={setNewCard}
				onSave={handleAddCard} // Add the card when saving
			>
				<button className='flex flex-row w-full h-8 items-center rounded hover:bg-trello-hover'>
					<Plus className='text-trello-list-text size-4 mx-2' />
					<h3 className='text-trello-list-text text-sm font-semibold'>Add Card</h3>
				</button>
			</EditCard>
		</div>
	);
};

export default List;
