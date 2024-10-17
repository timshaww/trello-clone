import { Board } from '@/lib/utils';
import { Ellipsis, Star } from 'lucide-react';
import React, { useState } from 'react';
import { useMainContext } from '../_contexts/MainContext';
import EditBoard from './EditBoard';

interface BoardCardProps {
	board: Board;
}

const BoardCard = ({ board }: BoardCardProps) => {
	const { boards, setBoards } = useMainContext();

	const [open, setOpen] = useState<boolean>(false);

	const setStar = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		const updatedBoards = boards.map((b) => {
			if (b.id === board.id) {
				return { ...b, star: !b.star };
			}
			return b;
		});

		setBoards(updatedBoards);
	};

	const openEdit = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		setOpen(true);
	};

	return (
		<a className='flex flex-row justify-between h-8 w-full group hover:bg-trello-hover px-2 items-center' href={`/boards/${board.id}`}>
			<div className='flex flex-row gap-2'>
				<div
					className={`h-5 w-8 rounded-sm bg-gradient-to-tl to-trello-backgrounds-${board.background}-to from-trello-backgrounds-${board.background}-from`}
				/>
				<p className='text-sm text-trello-text-p'>{board.title}</p>
			</div>
			<div className='flex-row gap-2 hidden group-hover:flex'>
				{/* Button to open the EditBoard component */}
				<button onClick={openEdit} className='hover:bg-trello-idk rounded-sm size-7 flex justify-center items-center'>
					<EditBoard board={board} open={open} setOpen={setOpen}>
						<Ellipsis className='text-trello-text-p size-4' />
					</EditBoard>
				</button>

				{/* Button to toggle the star */}
				<button onClick={setStar} className='hover:bg-trello-idk rounded-sm size-7 flex justify-center items-center'>
					<Star className='text-trello-text-p size-4' fill={board.star ? '#9badbc' : 'none'} />
				</button>
			</div>
		</a>
	);
};

export default BoardCard;
