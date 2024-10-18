import { Card } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import React from 'react';

interface AddChecklistProps {
	children?: React.ReactNode;
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
}

const AddChecklist = ({ children }: AddChecklistProps) => {
	const [title, setTitle] = React.useState<string>('');

	return (
		<Popover>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent>
				<div className='w-64 h-24 bg-trello-card-bg rounded border border-trello-border flex flex-col p-2'>
					<h3 className='w-full text-center font-semibold text-trello-text-p'>Add checklist</h3>
					<div className='flex flex-col w-full'>
						<h4 className='text-trello-text-p font-semibold text-xs'>Title</h4>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Checklist title'
							className='bg-trello-bg border-trello-border rounded-sm text-trello-text-p py-1 px-2 outline-none focus:outline-trello-focus mt-2'
						/>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default AddChecklist;
