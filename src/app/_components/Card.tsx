import React from 'react';
import { Card as CardType } from '../../lib/utils';
import { Clock, Eye, MessageCircle, Pencil, SquareCheckBig } from 'lucide-react';
import Avatar from './Avatar';
import { exampleMemberTim } from '@/lib/exampleInfo';

interface CardProps {
	card: CardType;
	setCard: React.Dispatch<React.SetStateAction<CardType>>;
}

const Card = ({ card, setCard }: CardProps) => {
	return (
		<div className='relative rounded-md p-2 bg-trello-card-bg flex flex-col w-full h-fit group hover:outline-trello-focus hover:outline'>
			<div className='absolute top-0.5 right-0.5 size-8 rounded-full flex items-center justify-center hover:bg-trello-hover'>
				<Pencil className='size-[14px] text-trello-text-p' />
				{/* TODO: Add Edit popover */}
			</div>
			<div className='flex flex-row gap-1 pb-1'>
				{card.labels.length > 0 && card.labels.map((label) => <div className={`rounded-full h-2 w-10 bg-trello-labels-${label.color}`} />)}
			</div>
			<h3 className='text-trello-text-p text-sm'>{card.title}</h3>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row gap-4 pt-2 pb-1'>
					{card.watchers.length > 0 &&
						card.watchers.map(() => (
							<div>
								<Eye className='size-3 text-trello-text-p' />
								<p>{card.watchers.length > 1 && `${card.watchers.length}`}</p>
							</div>
						))}

					<Clock className='size-3 text-trello-text-p' />
					<MessageCircle className='size-3 text-trello-text-p' />
					<SquareCheckBig className='size-3 text-trello-text-p' />
				</div>
				<Avatar members={[exampleMemberTim]} />
			</div>
		</div>
	);
};

export default Card;
