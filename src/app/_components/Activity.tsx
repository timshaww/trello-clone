import { Activity as ActivityType, Card } from '@/lib/utils';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { useMainContext } from '../_contexts/MainContext';

interface ActivityProps {
	card: Card;
	setCard: React.Dispatch<React.SetStateAction<Card>>;
}

const Activity = ({ card, setCard }: ActivityProps) => {
	const { currentMember } = useMainContext();
	const [newActivity, setNewActivity] = useState<string>(''); // State for new activity input

	// Remove a member from the card
	const handleRemoveMember = (memberId: string) => {
		setCard((prevCard) => ({
			...prevCard,
			members: prevCard.members.filter((m) => m.id !== memberId),
		}));
	};

	// Add a new activity to the card
	const handleAddActivity = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && newActivity.trim() !== '') {
			const newActivityItem: ActivityType = {
				id: Date.now().toString(),
				reactions: [],
				member: currentMember!,
				date: new Date(),
				title: newActivity,
			};

			setCard((prevCard) => ({
				...prevCard,
				activities: [...prevCard.activities, newActivityItem], // Add the new activity to the list
			}));

			setNewActivity(''); // Clear the input after adding
		}
	};

	return (
		<div className='flex flex-col'>
			{/* Input area for adding a new activity */}
			<div className='flex flex-row mt-2'>
				<div className='flex items-center'>
					<Avatar
						onRemoveMember={handleRemoveMember}
						className='size-8 text-xs -ml-1'
						members={[currentMember!]}
						borderClassName='border-trello-popover'
						popover={true}
					/>
				</div>
				<input
					type='text'
					className='bg-trello-bg rounded py-1.5 px-3 h-9 w-full mx-2 text-trello-text-p outline-none border-2 border-trello-bg focus:border-trello-focus'
					placeholder='Write a comment...'
					value={newActivity}
					onChange={(e) => setNewActivity(e.target.value)} // Update the new activity state
					onKeyDown={handleAddActivity} // Add activity on Enter key press
				/>
			</div>

			{/* Render the list of activities */}
			<div className='flex flex-col-reverse'>
				{card.activities.map((activity, index) => (
					<div key={index} className='flex flex-row mt-2'>
						<div className='flex items-start'>
							<Avatar
								onRemoveMember={handleRemoveMember}
								members={[activity.member]}
								borderClassName='border-trello-popover'
								popover={true}
								className='size-8 text-xs -ml-1'
							/>
						</div>
						<div className='flex flex-col w-full mx-2 items-start'>
							<p className='text-xs text-trello-text-p'>
								<span className='font-semibold'>
									{activity.member.firstName} {activity.member.lastName} &nbsp;
								</span>
								<span>
									{activity.date.toLocaleTimeString('en-US', {
										month: 'long',
										day: 'numeric',
										year: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
									})}
								</span>
							</p>
							<div className='h-9 p-1.5 bg-trello-bg w-full mt-0.5 rounded px-3 shadow'>
								<p className='text-trello-text-p'>{activity.title}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Activity;
