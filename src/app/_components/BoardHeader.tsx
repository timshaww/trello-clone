import React, { useState, useRef, useEffect } from 'react';
import { Board } from '@/lib/utils';
import { Ellipsis, ListFilter, Star } from 'lucide-react';

interface BoardHeaderProps {
	board: Board;
	setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const BoardHeader = ({ board, setBoard }: BoardHeaderProps) => {
	const [title, setTitle] = useState<string>(board.title);
	const [star, setStar] = useState<boolean>(board.star);

	const spanRef = useRef<HTMLSpanElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Update input width based on the span's size
	useEffect(() => {
		if (spanRef.current && inputRef.current) {
			inputRef.current.style.width = `${spanRef.current.offsetWidth + 16}px`;
		}
	}, [title]);

	return (
		<div className='h-14 w-full p-2 flex flex-row justify-between items-center bg-[rgba(0,0,0,0.20)]'>
			<div className='flex flex-row gap-2 items-center text-trello-text-h'>
				{/* Hidden span to calculate the width */}
				<span ref={spanRef} className=' font-semibold text-lg absolute opacity-0 pointer-events-none whitespace-pre' aria-hidden='true'>
					{title || board.title}
				</span>
				<input
					ref={inputRef}
					type='text'
					className='text-trello-text-h font-semibold text-lg bg-transparent placeholder:text-trello-text px-2 py-0.5 w-fit hover:bg-[#525864] rounded focus:outline-trello-focus'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder={board.title}
				/>
				<div className='flex items-center justify-center hover:bg-[#525864] rounded size-8' onClick={() => setStar(!star)}>
					<Star className='size-4 text-trello-text-h' fill={star ? 'white' : 'none'} />
				</div>
			</div>
			<div className='flex flex-row gap-2'>
				<div className='flex items-center justify-center hover:bg-[#525864] rounded size-8' onClick={() => setStar(!star)}>
					<ListFilter className='size-4 text-trello-text-h' />
				</div>
				<div className='flex items-center justify-center hover:bg-[#525864] rounded size-8' onClick={() => setStar(!star)}>
					<Ellipsis className='size-4 text-trello-text-h' />
				</div>
			</div>
		</div>
	);
};

export default BoardHeader;
