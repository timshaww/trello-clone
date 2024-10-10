import { Card } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { useMainContext } from '../_contexts/MainContext';

interface AddMemberProps {
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
	children?: React.ReactNode;
}

const AddMember = ({ card, setCard, children }: AddMemberProps) => {
	const [search, setSearch] = useState<string>('');
	const { board } = useMainContext();

	// Function to handle adding/removing a member to/from the card
	const handleToggleMember = (memberId: string) => {
		setCard((prevCard) => {
			const isMemberAdded = prevCard.members.some((m) => m.id === memberId);

			// If member is already on the card, remove them; otherwise, add them
			return {
				...prevCard,
				members: isMemberAdded
					? prevCard.members.filter((m) => m.id !== memberId)
					: [...prevCard.members, board.members.find((m) => m.id === memberId)!],
			};
		});
	};

	const handleRemoveMember = (memberId: string) => {
		setCard((prevCard) => ({
			...prevCard,
			members: prevCard.members.filter((m) => m.id !== memberId),
		}));
	};

	// Filter members based on search input
	const filteredMembers = board.members.filter(
		(member) => member.firstName.toLowerCase().includes(search.toLowerCase()) || member.lastName.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Popover modal={true}>
			<PopoverTrigger>
				{!children ? (
					<div className='rounded-full size-7 mt-1 duration-100 bg-[rgba(82,88,100,0.5)] flex items-center justify-center'>
						<div className='hover:bg-trello-idk rounded-full size-[28px] flex items-center justify-center'>
							<Plus className='text-trello-text-p size-4' />
						</div>
					</div>
				) : (
					children
				)}
			</PopoverTrigger>
			<PopoverContent>
				<div className='bg-trello-card-bg border border-trello-border size-32 rounded-lg w-[304px] h-fit p-3 '>
					<h3 className='font-semibold text-trello-text-p w-full flex justify-center'>Members</h3>
					<input
						type='text'
						className='bg-trello-bg px-2 text-trello-text-p outline-none border border-trello-border ring-none focus:outline-trello-focus rounded-sm w-full mt-2'
						placeholder='Search members'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<div>
						<p className='text-trello-text-p font-semibold text-xs mt-4'>Board members</p>
						{filteredMembers.map((member, index) => {
							const isMemberAdded = card.members.some((m) => m.id === member.id);

							return (
								<div
									key={index}
									className='flex flex-row gap-2 items-center h-10 hover:bg-trello-bg rounded-md p-1 cursor-pointer'
									onClick={() => handleToggleMember(member.id)}
								>
									<Avatar
										onRemoveMember={handleRemoveMember}
										members={[member]}
										borderClassName='border-trello-popover'
										className='mt-0 text-xs'
										popover={true}
									/>
									<div className='flex flex-row justify-between w-full items-center'>
										<p className='text-trello-text-p font-semibold'>
											{member.firstName} {member.lastName}
										</p>
										{isMemberAdded && (
											<X className='text-trello-text-p size-4' /> // Show an X if member is already added to indicate removal
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default AddMember;
