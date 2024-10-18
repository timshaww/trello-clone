import { Board } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { useMainContext } from '../_contexts/MainContext';

interface AddBoardProps {
	children: ReactNode;
	side?: 'left' | 'right' | 'top' | 'bottom';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Background = 'snow' | 'ocean' | 'crystal' | 'rainbow' | 'peach' | 'flower' | 'earth' | 'alien';

const AddBoard = ({ children, side, open, setOpen }: AddBoardProps) => {
	const { boards, setBoards, currentMember } = useMainContext();

	const [title, setTitle] = useState<string>('');
	const [background, setBackground] = useState<Background>('snow');
	const [error, setError] = useState<string>('');

	const handleSubmit = () => {
		if (!title.trim()) {
			setError('Board title cannot be empty'); // Show error if title is empty
			return;
		}
		const newBoards: Board[] = [...boards, { id: Date.now().toString(), title, background, star: false, lists: [], members: [currentMember!] }];
		setBoards(newBoards);
		setTitle('');
		setBackground('snow');
		setOpen(false);
	};

	return (
		<Popover open={open}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent side={side}>
				<div className='w-[304px] p-3 bg-trello-popover outline-none flex flex-col rounded'>
					<div className='relative flex items-center justify-center'>
						<h1 className='text-trello-text-p text-sm font-semibold'>Create board</h1>
						<X
							onClick={() => setOpen(false)}
							className='absolute top-0 right-0 cursor-pointer text-trello-text-p hover:bg-trello-bg size-5 rounded'
						/>
					</div>
					<div className='w-full h-[1px] bg-trello-text-p my-3 opacity-50' />
					<div className='flex justify-center'>
						<div
							className={`rounded-sm w-[200px] h-[120px] bg-gradient-to-tl to-trello-backgrounds-${background}-to from-trello-backgrounds-${background}-from`}
						>
							<div className='m-3 grid grid-cols-3 grid-rows-1 gap-3'>
								<div className='rounded-[2px] flex flex-col bg-trello-list-bg p-1 h-full gap-1'>
									<div className='w-5 h-2 bg-trello-idk bg-trello rounded-[1px]' />
									<div className='h-4 w-full bg-trello-card-bg p-1 rounded-[1px]'>
										<div className='w-6 h-2 bg-trello-idk rounded-[1px]' />
									</div>
									<div className='h-4 w-full bg-trello-card-bg p-1 rounded-[1px]'>
										<div className='w-4 h-2 bg-trello-idk rounded-[1px]' />
									</div>
									<div className='h-8 w-full rounded-[1px]'>
										<div className='flex flex-col rounded-[1px]'>
											<div className='bg-trello-card-bg opacity-50 h-4' />
											<div className='bg-trello-card-bg h-4 w-full p-1'>
												<div className='w-4 h-2 bg-trello-idk rounded-[1px]' />
											</div>
										</div>
									</div>
								</div>

								<div className='rounded-[2px] flex flex-col bg-trello-list-bg p-1 h-fit gap-1'>
									<div className='w-3 h-2 bg-trello-idk rounded-[1px]' />
									<div className='h-4 w-full bg-trello-card-bg p-1 rounded-[1px]'>
										<div className='w-6 h-2 bg-trello-idk rounded-[1px]' />
									</div>
									<div className='h-4 w-full bg-trello-card-bg p-1 rounded-[1px]'>
										<div className='w-4 h-2 bg-trello-idk rounded-[1px]' />
									</div>
								</div>

								<div className='rounded-[2px] flex flex-col bg-trello-list-bg p-1 h-full gap-1'>
									<div className='w-7 h-2 bg-trello-idk rounded-[1px]' />
									<div className='h-8 w-full rounded-[1px]'>
										<div className='flex flex-col rounded-[1px]'>
											<div className='bg-trello-card-bg opacity-50 h-4' />
											<div className='bg-trello-card-bg h-4 w-full p-1'>
												<div className='w-4 h-2 bg-trello-idk rounded-[1px]' />
											</div>
										</div>
									</div>
									<div className='h-4 w-full bg-trello-card-bg p-1 rounded-[1px]'>
										<div className='w-6 h-2 bg-trello-idk rounded-[1px]' />
									</div>
									<div className='h-4 w-full bg-trello-card-bg p-1 rounded-[1px]'>
										<div className='w-4 h-2 bg-trello-idk rounded-[1px]' />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col mt-3'>
						<h2 className='text-xs text-trello-text-p font-semibold'>Background</h2>
						<div className='grid grid-cols-4 grid-rows-2 gap-2 h-20 my-2'>
							<div
								onClick={() => setBackground('snow')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-snow-from to-trello-backgrounds-snow-to '
							>
								{background === 'snow' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
							<div
								onClick={() => setBackground('ocean')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-ocean-from to-trello-backgrounds-ocean-to'
							>
								{background === 'ocean' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
							<div
								onClick={() => setBackground('crystal')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-crystal-from to-trello-backgrounds-crystal-to'
							>
								{background === 'crystal' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
							<div
								onClick={() => setBackground('rainbow')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-rainbow-from to-trello-backgrounds-rainbow-to'
							>
								{background === 'rainbow' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
							<div
								onClick={() => setBackground('peach')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-peach-from to-trello-backgrounds-peach-to'
							>
								{background === 'peach' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
							<div
								onClick={() => setBackground('flower')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-flower-from to-trello-backgrounds-flower-to'
							>
								{background === 'flower' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
							<div
								onClick={() => setBackground('earth')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-earth-from to-trello-backgrounds-earth-to'
							>
								{background === 'earth' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
							<div
								onClick={() => setBackground('alien')}
								className='rounded bg-gradient-to-tl from-trello-backgrounds-alien-from to-trello-backgrounds-alien-to'
							>
								{background === 'alien' && (
									<div
										className='flex w-full h-full items-center justify-center rounded'
										style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
									>
										<Check className='text-trello-text-h size-4' />
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='flex flex-col'>
						<h2 className='text-xs text-trello-text-p font-semibold mb-1'>
							Board title <span className='text-red-600'>*</span>
						</h2>
						<input
							type='text'
							className='focus:ring-trello-focus focus:ring-[2px] rounded bg-trello-bg outline-none text-trello-text-p p-2 text-sm'
							onChange={(e) => {
								setTitle(e.target.value);
								setError('');
							}}
							value={title}
						/>
						{error && <p className='text-red-600 text-xs mt-1'>{error}</p>}
					</div>
					<div>
						<button
							onClick={handleSubmit}
							className='w-full py-1.5 px-3 bg-trello-accent hover:bg-trello-focus duration-100 rounded mt-3 text-trello-popover font-semibold text-sm'
						>
							Create
						</button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default AddBoard;
