'use client';

import { Card, ChecklistItem, Member } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/ui/dialog';
import {
	Archive,
	Calendar,
	Captions,
	Check,
	Clock,
	Eye,
	List,
	Plus,
	SquareCheckBig,
	Tags,
	Text,
	UserRound,
	UserRoundMinus,
	UserRoundPlus,
	X,
} from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import Avatar from './Avatar';
import AddMember from './AddMember';
import { useMainContext } from '../_contexts/MainContext';
import EditDueDate from './EditDueDate';
import Checklist from './Checklist';
import Activity from './Activity';
import AddChecklist from './AddChecklist';
import AddLabel from './AddLabel';

interface EditCardProps {
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
	listTitle: string;
	children: ReactNode;
	onSave: () => void;
	onRemove: (cardId: string) => void;
}

const EditCard = ({ children, card, setCard, listTitle, onSave, onRemove }: EditCardProps) => {
	const [open, setOpen] = useState(false);
	const [description, setDescription] = useState(card.description);
	const { currentMember } = useMainContext();

	const handleRemoveMember = (memberId: string) => {
		setCard((prevCard) => ({
			...prevCard,
			members: prevCard.members.filter((m) => m.id !== memberId),
		}));
	};

	const handleClose = () => {
		onSave();
		setOpen(false);
	};

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<div onClick={() => setOpen(true)}>{children}</div>
			</DialogTrigger>
			<DialogContent
				className='fixed left-[0] top-[0] z-50 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center border-none '
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						handleClose();
					}
				}}
			>
				<div className='w-[700px] h-[800px] fixed bg-trello-popover rounded-xl flex flex-col p-4'>
					<div className='flex flex-row w-full gap-1 items-start mb-6'>
						<Captions className='text-trello-text-p my-1 size-6' />
						<div className='flex flex-col w-full'>
							<input
								autoFocus={false}
								type='text'
								className='w-full outline-none text-trello-text-p font-semibold text-lg bg-transparent placeholder:text-trello-text px-2 py-0.5 hover:bg-[#525864] rounded focus:outline-trello-focus focus:hover:bg-transparent'
								value={card.title}
								onChange={(e) => setCard({ ...card, title: e.target.value })}
								placeholder={card.title}
							/>
							<div className='flex flex-row text-sm mt-1.5 gap-1 text-trello-text-p px-2'>
								in list{' '}
								<div className='inline-flex items-center justify-center px-0.5 rounded-sm bg-[rgba(82,88,100,0.5)] py-0'>
									<h2 className='font-semibold text-xs rounded-sm '>{listTitle.toLocaleUpperCase()}</h2>
								</div>
							</div>
						</div>
						<div onClick={() => handleClose()} className='size-8 rounded hover:bg-[#525864] flex items-center justify-center'>
							<X className='text-trello-text-p size-6' />
						</div>
					</div>
					<div className='flex flex-row w-full h-full'>
						<div className='flex flex-col w-full'>
							<div className='flex flex-row w-full gap-1 items-start mb-6 mx-2'>
								<Captions className='text-trello-text-p size-6 opacity-0' />
								<div className='flex flex-row flex-wrap gap-2 '>
									{card.members.length > 0 && (
										<div className='flex flex-col'>
											<h3 className='px-2 text-xs font-semibold text-trello-text-p'>Members</h3>
											<div className='flex flex-row gap-0.5'>
												<Avatar
													members={card.members}
													className='ml-2 mt-1 text-xs'
													borderClassName='border-trello-popover'
													popover={true}
													onRemoveMember={handleRemoveMember}
												/>
												<AddMember card={card} setCard={setCard} />
											</div>
										</div>
									)}
									{card.labels.length > 0 && (
										<div className='flex flex-col px-2 gap-1'>
											<h3 className='text-xs font-semibold text-trello-text-p'>Labels</h3>
											<div className='flex flex-wrap gap-1 '>
												{card.labels.map((label, index) => (
													<div
														key={index}
														className={`rounded h-8 px-2 min-w-12 w-fit bg-trello-labels-${label.color} flex items-center justify-center`}
													>
														<p className='text-trello-bg'>{label.title}</p>
													</div>
												))}
												<AddLabel card={card} setCard={setCard}>
													<div className='rounded h-8 w-8 bg-[rgba(82,88,100,0.5)] flex items-center justify-center'>
														<div className='w-full h-full hover:bg-trello-idk duration-100 flex items-center justify-center rounded'>
															<Plus className='text-trello-text-p size-4' />
														</div>
													</div>
												</AddLabel>
											</div>
										</div>
									)}
									<div className='flex flex-col'>
										<h3 className='px-2 text-xs font-semibold text-trello-text-p'>Notifications</h3>
										<button
											onClick={() =>
												setCard((prev) => ({
													...prev,
													watchers: prev.watchers.includes(currentMember!)
														? prev.watchers.filter((watcher) => watcher.id !== currentMember!.id) // Compare by member's unique id
														: [...prev.watchers, currentMember!],
												}))
											}
											className='mx-2 mt-1 rounded-[2px] items-center hover:bg-[#525864] duration-100 justify-center px-2 gap-2 h-8 bg-[rgba(82,88,100,0.5)] flex flex-row'
										>
											<Eye className='text-trello-text-p size-4' />
											<p className='text-sm text-trello-text-p font-semibold'>
												{currentMember && card.watchers.some((watcher) => watcher.id === currentMember.id)
													? 'Watching'
													: 'Watch'}
											</p>
											{currentMember && card.watchers.some((watcher) => watcher.id === currentMember.id) && (
												<Check className='text-trello-text-p size-4' />
											)}
										</button>
									</div>
									{card.dueDate && (
										<div className='flex flex-col'>
											<h3 className='px-2 text-xs font-semibold text-trello-text-p'>Due date</h3>
											<EditDueDate card={card} setCard={setCard}>
												<div className='mx-2 mt-1 rounded-[2px] items-center hover:bg-[#525864] duration-100 justify-center px-2 gap-2 h-8 bg-[rgba(82,88,100,0.5)] flex flex-row'>
													<p className='text-sm text-trello-text-p font-semibold'>
														{card.dueDate.toLocaleDateString('en-US', {
															month: 'short',
															day: 'numeric',
															year: 'numeric',
														})}
													</p>
												</div>
											</EditDueDate>
										</div>
									)}
								</div>
							</div>

							<div className='flex flex-row w-full gap-1 items-start mb-6'>
								<Text className='text-trello-text-p size-6 ' />
								<div className='flex flex-col px-2 w-full'>
									<h2 className='text-lg font-semibold text-trello-text-p'>Description</h2>
									<textarea
										name='description'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										id={card.id}
										className=' p-1 w-full bg-[rgba(82,88,100,0.5)] text-trello-text-p rounded resize-none'
									/>
								</div>
							</div>
							{card.checklist && (
								<div className='flex flex-col w-full mb-6'>
									<div className='flex flex-row  w-full gap-1 items-start mb-2'>
										<SquareCheckBig className='text-trello-text-p size-6' />
										<h2 className='px-2 w-full text-lg font-semibold text-trello-text-p'>Checklist</h2>
									</div>
									<Checklist card={card} setCard={setCard} />
								</div>
							)}
							<div className='flex flex-col  w-full mb-6'>
								<div className='flex flex-row w-full gap-1 items-start mb-2'>
									<List className='text-trello-text-p size-6' />
									<h2 className='px-2 text-lg font-semibold text-trello-text-p'>Actvity</h2>
								</div>
								<Activity card={card} setCard={setCard} />
							</div>
						</div>
						<div className='flex flex-col h-full justify-between'>
							<div className='flex flex-col gap-2'>
								<button
									className='bg-[rgba(82,88,100,0.5)] w-[168px] h-8 rounded-sm text-trello-text-p flex items-center justify-start py-1.5 px-3 gap-2 hover:bg-trello-idk'
									onClick={() =>
										setCard((prev) => ({
											...prev,
											members: prev.members.includes(currentMember!)
												? (prev.members.filter((member) => member !== currentMember) as Member[])
												: ([...prev.members, currentMember] as Member[]),
										}))
									}
								>
									{currentMember && card.members.includes(currentMember) ? (
										<UserRoundMinus className='size-4' />
									) : (
										<UserRoundPlus className='size-4' />
									)}
									<p>{currentMember && card.members.includes(currentMember) ? 'Leave' : 'Join'}</p>
								</button>
								<AddMember card={card} setCard={setCard}>
									<div className='bg-[rgba(82,88,100,0.5)] w-[168px] h-8 rounded-sm text-trello-text-p flex items-center justify-start py-1.5 px-3 gap-2 hover:bg-trello-idk'>
										<UserRound className='size-4' />
										<p>Members</p>
									</div>
								</AddMember>
								<AddLabel card={card} setCard={setCard}>
									<div className='bg-[rgba(82,88,100,0.5)] w-[168px] h-8 rounded-sm text-trello-text-p flex items-center justify-start py-1.5 px-3 gap-2 hover:bg-trello-idk'>
										<Tags className='size-4' />
										<p>Labels</p>
									</div>
								</AddLabel>
								<button
									onClick={() =>
										setCard((prev) => {
											if (!prev.checklist) {
												return {
													...prev,
													checklist: { id: '', title: 'Checklist', checklistItems: [] as ChecklistItem[] },
												};
											}
											return prev;
										})
									}
									className='bg-[rgba(82,88,100,0.5)] w-[168px] h-8 rounded-sm text-trello-text-p flex items-center justify-start py-1.5 px-3 gap-2 hover:bg-trello-idk'
								>
									<SquareCheckBig className='size-4' />
									<p>Checklist</p>
								</button>

								{/* <button
									className='bg-[rgba(82,88,100,0.5)] w-[168px] h-8 rounded-sm text-trello-text-p flex items-center justify-start py-1.5 px-3 gap-2 hover:bg-trello-idk'
									onClick={() =>
										setCard((prev) => ({
											...prev,
											members: prev.members.includes(currentMember!)
												? (prev.members.filter((member) => member !== currentMember) as Member[])
												: ([...prev.members, currentMember] as Member[]),
										}))
									}
								>
									<Clock className='size-4' />
									<p>Due date</p>
								</button> */}
							</div>
							<div>
								<button
									className='bg-[rgba(82,88,100,0.5)] w-[168px] h-8 rounded-sm text-trello-text-p flex items-center justify-start py-1.5 px-3 gap-2 hover:bg-trello-idk'
									onClick={() => {
										onRemove(card.id);
										handleClose();
									}}
								>
									<Archive className='size-4' />
									<p>Archive</p>
								</button>
							</div>
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
