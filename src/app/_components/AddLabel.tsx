import { Card, Label } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Check } from 'lucide-react';
import React from 'react';

interface AddLabelProps {
	children?: React.ReactNode;
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
}

type LabelColor = 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black';

const AddLabel = ({ children, card, setCard }: AddLabelProps) => {
	const [title, setTitle] = React.useState<string>('');
	const [selectedLabel, setSelectedLabel] = React.useState<LabelColor>('black');

	const labels = [
		{ color: 'bg-trello-labels-green', label: 'green' },
		{ color: 'bg-trello-labels-yellow', label: 'yellow' },
		{ color: 'bg-trello-labels-orange', label: 'orange' },
		{ color: 'bg-trello-labels-red', label: 'red' },
		{ color: 'bg-trello-labels-purple', label: 'purple' },
		{ color: 'bg-trello-labels-blue', label: 'blue' },
		{ color: 'bg-trello-labels-sky', label: 'sky' },
		{ color: 'bg-trello-labels-lime', label: 'lime' },
		{ color: 'bg-trello-labels-pink', label: 'pink' },
		{ color: 'bg-trello-labels-black', label: 'black' },
	];

	// Function to handle the save operation when the "Add label" button is clicked
	const handleSaveLabel = () => {
		if (selectedLabel) {
			setCard((prev) => {
				const isLabelSelected = prev.labels.includes(selectedLabel as unknown as Label);
				return {
					...prev,
					labels: isLabelSelected
						? prev.labels // If label is already selected, do nothing
						: [
								...prev.labels,
								{
									color: selectedLabel,
									id: Math.random().toString(),
									title,
								},
						  ], // Otherwise, add the selected label
				};
			});
			setSelectedLabel('black'); // Optionally clear the selection after saving
		}
	};

	return (
		<Popover>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent>
				<div className='w-64 h-fit bg-trello-card-bg rounded border border-trello-border flex flex-col p-2'>
					<h3 className='w-full text-center font-semibold text-trello-text-p'>Add label</h3>
					<div className='flex flex-col w-full'>
						<h4 className='text-trello-text-p font-semibold text-xs'>Title</h4>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Label title'
							className='bg-trello-bg border-trello-border rounded-sm text-trello-text-p py-1 px-2 outline-none focus:outline-trello-focus mt-2'
						/>
					</div>
					<div className='grid grid-cols-5 grid-rows-2 gap-1 mt-3'>
						{labels.map((label) => (
							<div
								key={label.label}
								onClick={() => setSelectedLabel(label.label as LabelColor)}
								className={`rounded ${label.color} w-full h-8 relative cursor-pointer`}
							>
								{selectedLabel === label.label && (
									<div
										className='absolute inset-0 flex items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-white size-4' />
									</div>
								)}
							</div>
						))}
					</div>
					<button
						onClick={handleSaveLabel} // Trigger the save action when clicked
						className='px-3 rounded mt-2 py-1.5 bg-trello-accent text-trello-text-h font-semibold'
					>
						Add label
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default AddLabel;
