import React, { useEffect, useState } from 'react';
import { Activity, Card as CardType, Checklist, ChecklistItem, Label, Member } from '../../lib/utils';
import { Clock, Eye, MessageCircle, Pencil, SquareCheckBig } from 'lucide-react';
import Avatar from './Avatar';
import { exampleMemberTim } from '@/lib/exampleInfo';
import EditCard from './EditCard';

interface CardProps {
	card: CardType;
	setCard: React.Dispatch<React.SetStateAction<CardType>>;
	listTitle: string;
	onRemove: (cardId: string) => void;
	onSave: () => void;
}

const Card = ({ card, setCard, listTitle, onRemove, onSave }: CardProps) => {
	const handleRemoveMember = (memberId: string) => {
		setCard((prevCard) => ({
			...prevCard,
			members: prevCard.members.filter((m) => m.id !== memberId),
		}));
	};

	return (
		<div className='relative rounded-md p-2 bg-trello-card-bg flex flex-col w-full h-fit group hover:outline-trello-focus hover:outline'>
			<EditCard onSave={onSave} onRemove={onRemove} card={card} setCard={setCard} listTitle={listTitle}>
				<div className='absolute top-0.5 right-0.5 size-8 rounded-full flex items-center justify-center hover:bg-trello-hover'>
					<Pencil className='size-[14px] text-trello-text-p' />
				</div>
			</EditCard>
			<div className='flex flex-row gap-1 pb-1'>
				{card.labels.length > 0 &&
					card.labels.map((label, index) => <div key={index} className={`rounded-full h-2 w-10 bg-trello-labels-${label.color}`} />)}
			</div>
			<h3 className='text-trello-text-p text-sm'>{card.title}</h3>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row gap-4 pt-2 pb-1 items-center'>
					{card.watchers.length > 0 && (
						<div className='flex flex-row items-center gap-1'>
							<Eye className='size-3 text-trello-text-p' />
							<p className='text-xs text-trello-text-p'>{card.watchers.length}</p>
						</div>
					)}
					{card.dueDate && (
						<div className='flex flex-row items-center gap-1'>
							<Clock className='size-3 text-trello-text-p' />
							<p className='text-xs text-trello-text-p'>
								{card.dueDate.toLocaleString('en-US', {
									month: 'short',
									day: 'numeric',
								})}
							</p>
						</div>
					)}
					{card.checklist && card.checklist?.checklistItems.length > 0 && (
						<div className='flex flex-row items-center gap-1'>
							<SquareCheckBig className='size-3 text-trello-text-p' />
							<p className='text-xs text-trello-text-p'>{card.checklist.checklistItems.length}</p>
						</div>
					)}
					{card.activities.length > 0 && (
						<div className='flex flex-row items-center gap-1'>
							<MessageCircle className='size-3 text-trello-text-p' />
							<p className='text-xs text-trello-text-p'>{card.activities.length}</p>
						</div>
					)}
				</div>
				<Avatar
					onRemoveMember={handleRemoveMember}
					members={card.members}
					className='size-6 text-[10px] px-0'
					borderClassName='border-trello-card-bg'
					popover={false}
				/>
			</div>
		</div>
	);
};

export default Card;
