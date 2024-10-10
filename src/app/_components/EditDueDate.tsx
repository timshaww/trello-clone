import { Card } from '@/lib/utils';
import { Calendar } from '@/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import React from 'react';

interface EditDueDateProps {
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
	children: React.ReactNode;
}

const EditDueDate = ({ card, setCard, children }: EditDueDateProps) => {
	const [date, setDate] = React.useState<Date>();

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent className=''>
				<Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
			</PopoverContent>
		</Popover>
	);
};

export default EditDueDate;
