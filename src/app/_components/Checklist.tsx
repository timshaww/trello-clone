import { Card } from '@/lib/utils';
import { Progress } from '@/ui/progress';
import React from 'react';
import Avatar from './Avatar';

interface ChecklistProps {
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
}

const Checklist = ({ card, setCard }: ChecklistProps) => {
	const percent =
		card.checklist && card.checklist.checklistItems.length
			? (card.checklist.checklistItems.filter((item) => item.completed).length / card.checklist.checklistItems.length) * 100
			: 0; // Multiply by 100 to convert to percentage

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-row items-center gap-1'>
				<div className='flex text-right size-6 items-center justify-end'>
					<p className='text-xs text-trello-text-p'>{percent}%</p>
				</div>
				<Progress className='h-1.5 w-full mx-2 bg-[rgba(82,88,100,0.5)]' value={percent} />
			</div>
			<div className='flex flex-row items-center gap-1'>
				<div className='size-6' />
				<div>
					{card.checklist &&
						card.checklist.checklistItems.map((item, index) => (
							<div className='flex items-center px-2 gap-2'>
								<input
									id={`checkbox-${index}`}
									type='checkbox'
									checked={item.completed}
									onChange={(e) => {
										const updatedItems = card.checklist!.checklistItems.map((checkItem, idx) =>
											idx === index ? { ...checkItem, completed: e.target.checked } : checkItem
										);
										setCard((prev) => {
											if (!prev.checklist) {
												return prev;
											}

											return {
												...prev,
												checklist: {
													...prev.checklist,
													checklistItems: updatedItems,
													id: prev.checklist.id || '', // Ensure `id` is a string
												},
											};
										});
									}}
									className='hidden'
								/>
								<label
									htmlFor={`checkbox-${index}`}
									className={`relative cursor-pointer h-4 w-4 flex-shrink-0 border border-trello-border rounded-sm transition-all duration-150 ease-in-out
    ${item.completed ? 'bg-trello-accent border-trello-focus' : 'bg-trello-card-bg border-trello-border'}`}
								>
									{item.completed && (
										<svg
											className='absolute top-0 left-0 w-full h-full text-white'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											viewBox='0 0 24 24'
										>
											<path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
										</svg>
									)}
								</label>
								<span className='ml-2 text-trello-text-p'>{item.title}</span>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Checklist;
