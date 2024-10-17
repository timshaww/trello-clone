import React, { useState } from 'react';
import { Card } from '@/lib/utils';
import { Progress } from '@/ui/progress';
import { Check, Pencil, Trash, X } from 'lucide-react';

interface ChecklistProps {
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
}

const Checklist = ({ card, setCard }: ChecklistProps) => {
	const [newItemTitle, setNewItemTitle] = useState<string>(''); // State for new checklist item
	const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null); // State for tracking editing item
	const [editedItemTitle, setEditedItemTitle] = useState<string>(''); // State for edited item

	const percent =
		card.checklist && card.checklist.checklistItems.length
			? (card.checklist.checklistItems.filter((item) => item.completed).length / card.checklist.checklistItems.length) * 100
			: 0; // Calculate percentage

	// Handle adding a new checklist item
	const handleAddItem = () => {
		if (!newItemTitle.trim()) return;

		const newItem = {
			id: Date.now().toString(),
			title: newItemTitle,
			completed: false,
			members: [],
			dueDate: new Date(),
		};

		setCard((prev) => ({
			...prev,
			checklist: {
				...prev.checklist!,
				checklistItems: [...prev.checklist!.checklistItems, newItem],
			},
		}));

		setNewItemTitle(''); // Clear input after adding
	};

	// Handle editing a checklist item
	const handleEditItem = (index: number) => {
		setEditingItemIndex(index);
		setEditedItemTitle(card.checklist!.checklistItems[index].title); // Load current title into input
	};

	// Handle saving an edited checklist item
	const handleSaveEditItem = (index: number) => {
		const updatedItems = card.checklist!.checklistItems.map((item, idx) => (idx === index ? { ...item, title: editedItemTitle } : item));

		setCard((prev) => ({
			...prev,
			checklist: {
				...prev.checklist!,
				checklistItems: updatedItems,
			},
		}));

		setEditingItemIndex(null); // Reset editing state
	};

	// Handle deleting a checklist item
	const handleDeleteItem = (index: number) => {
		const updatedItems = card.checklist!.checklistItems.filter((_, idx) => idx !== index);

		setCard((prev) => ({
			...prev,
			checklist: {
				...prev.checklist!,
				checklistItems: updatedItems,
			},
		}));
	};

	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-row items-center gap-1'>
				<div className='flex text-right size-6 items-center justify-end'>
					<p className='text-xs text-trello-text-p'>{percent.toFixed(0)}%</p>
				</div>
				<Progress className='h-1.5 w-full mx-2 bg-[rgba(82,88,100,0.5)]' value={percent} />
			</div>

			{/* Checklist Items */}
			<div className='flex flex-col mt-2'>
				{card.checklist &&
					card.checklist.checklistItems.map((item, index) => (
						<div key={index} className='flex items-center px-2 gap-2'>
							{/* Checkbox */}
							<input
								id={`checkbox-${index}`}
								type='checkbox'
								checked={item.completed}
								onChange={(e) => {
									const updatedItems = card.checklist!.checklistItems.map((checkItem, idx) =>
										idx === index ? { ...checkItem, completed: e.target.checked } : checkItem
									);
									setCard((prev) => ({
										...prev,
										checklist: {
											...prev.checklist!,
											checklistItems: updatedItems,
										},
									}));
								}}
								className='hidden'
							/>
							<label
								htmlFor={`checkbox-${index}`}
								className={`relative cursor-pointer h-4 w-4 flex-shrink-0 border border-trello-border rounded-sm transition-all duration-150 ease-in-out ${
									item.completed ? 'bg-trello-accent border-trello-focus' : 'bg-trello-card-bg border-trello-border'
								}`}
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

							{/* Edit Mode */}
							{editingItemIndex === index ? (
								<div className='flex flex-row w-full gap-2'>
									<input
										type='text'
										value={editedItemTitle}
										onChange={(e) => setEditedItemTitle(e.target.value)}
										className='w-full px-2 py-1 rounded-sm bg-trello-bg outline-none text-trello-text-p border-2 border-trello-bg focus:border-trello-focus'
									/>
									<div className='flex gap-2 items-center justify-center'>
										<button
											className='text-xs text-trello-accent hover:bg-trello-idk size-5 flex items-center rounded-sm justify-center'
											onClick={() => handleSaveEditItem(index)}
										>
											<Check className='size-3' />
										</button>
										<button
											className='text-xs text-trello-text-p  hover:bg-trello-idk size-5 flex items-center rounded-sm justify-center'
											onClick={() => setEditingItemIndex(null)}
										>
											<X className='size-3' />
										</button>
									</div>
								</div>
							) : (
								<div className='group flex flex-row w-full justify-between'>
									{/* Checklist Item Title */}
									<span className='flex-1 text-trello-text-p'>{item.title}</span>
									{/* Edit and Delete buttons */}
									<div className='flex flex-row gap-2'>
										<button
											className='text-xs text-trello-text-p hidden group-hover:flex size-5 items-center justify-center hover:bg-trello-idk rounded-sm'
											onClick={() => handleEditItem(index)}
										>
											<Pencil className='size-3' />
										</button>
										<button
											className='text-xs text-trello-text-p hidden group-hover:flex size-5 items-center justify-center hover:bg-trello-idk rounded-sm'
											onClick={() => handleDeleteItem(index)}
										>
											<Trash className='size-3' />
										</button>
									</div>
								</div>
							)}
						</div>
					))}
			</div>

			{/* Add new checklist item */}
			<div className='flex flex-row items-center mt-2 gap-2'>
				<input
					type='text'
					value={newItemTitle}
					onChange={(e) => setNewItemTitle(e.target.value)}
					placeholder='Add a new item'
					className='w-full ml-8 px-2 py-1 rounded-sm bg-trello-bg outline-none text-trello-text-p border-2 border-trello-bg focus:border-trello-focus'
				/>
				<button onClick={handleAddItem} className='text-xs text-trello-accent px-2 py-1 w-[56px] mr-2 hover:bg-trello-idk rounded-sm'>
					Add
				</button>
			</div>
		</div>
	);
};

export default Checklist;
