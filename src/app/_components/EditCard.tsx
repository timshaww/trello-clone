import { Card } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/ui/dialog';
import { Captions, X } from 'lucide-react';
import { List } from 'postcss/lib/list';
import React, { ReactNode, useState } from 'react';

interface EditCardProps {
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
	listTitle: string;
	children: ReactNode;
}

const EditCard = ({ children, card, setCard, listTitle }: EditCardProps) => {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		console.log('click');
	};
	return (
		<Dialog open={open}>
			<DialogTrigger asChild onClick={handleClick}>
				<div onClick={() => setOpen(true)}>{children}</div>
			</DialogTrigger>
			<DialogContent
				className='fixed left-[0] top-[0] z-50 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center border-none '
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						setOpen(false);
					}
				}}
			>
				<div className='w-[500px] h-[800px] fixed bg-trello-popover rounded-xl flex flex-col p-4'>
					<div className='flex flex-row w-full gap-1 items-start mb-6'>
						<Captions className='text-trello-text-p my-1' />
						<div className='flex flex-col w-full'>
							<input
								type='text'
								className='w-full text-trello-text-p font-semibold text-lg bg-transparent placeholder:text-trello-text px-2 py-0.5 hover:bg-[#525864] rounded focus:outline-trello-focus'
								value={card.title}
								onChange={(e) => setCard({ ...card, title: e.target.value })}
								placeholder={card.title}
							/>
							<div className='flex flex-row  gap-1 text-trello-text-p px-2'>
								in list{' '}
								<div className='inline-flex items-center justify-center px-0.5 rounded-sm bg-[rgba(82,88,100,0.5)] py-0'>
									<h2 className='font-semibold text-xs rounded-sm '>{listTitle.toLocaleUpperCase()}</h2>
								</div>
							</div>
						</div>
						<div onClick={() => setOpen(false)} className='size-8 rounded hover:bg-[#525864] flex items-center justify-center'>
							<X className='text-trello-text-p' />
						</div>
					</div>
					<div className='flex flex-row'>
						<div className='flex flex-col'>
							<div className='flex flex-col'></div>
						</div>
					</div>
				</div>
				<DialogTitle></DialogTitle>
				<DialogDescription></DialogDescription>
			</DialogContent>
		</Dialog>
	);
};

export default EditCard;
