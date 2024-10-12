import { cn, Member } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import React from 'react';

interface AvatarProps {
	members: Member[];
	className?: string;
	borderClassName: string;
	popover: boolean;
	onRemoveMember: (memberId: string) => void;
}

const Avatar = ({ members, className, borderClassName, popover, onRemoveMember }: AvatarProps) => {
	return (
		<div className='flex'>
			{members.map((member, index) => (
				<Popover key={index}>
					<PopoverTrigger>
						<div
							style={{ zIndex: popover ? 100 - index : 20 - index }}
							className={cn(
								`bg-trello-labels-${member.color} border-2 rounded-full size-8 flex items-center justify-center`,
								className,
								borderClassName,
								index > 0 ? '-ml-3' : ''
							)}
						>
							<div className='hover:bg-[rgba(0,0,0,0.5)] rounded-full size-[28px] flex items-center justify-center'>
								<p className='text-trello-text-h font-semibold'>
									{member.firstName.substring(0, 1)}
									{member.lastName.substring(0, 1)}
								</p>
							</div>
						</div>
					</PopoverTrigger>
					<PopoverContent>
						<div className='relative flex flex-col rounded-lg shadow w-[304px] h-[150px] bg-trello-card-bg border-[1px] border-trello-border'>
							<div className='bg-trello-accent h-[88px] rounded-t-lg'>
								<h3 className='text-trello-text-h mt-14 font-semibold ml-24 text-xl'>
									{member.firstName} {member.lastName}
								</h3>
							</div>
							<div className='p-3'>
								<button
									className='hover:bg-trello-hover w-full mt-3 rounded text-trello-text-p text-left px-2'
									onClick={() => onRemoveMember(member.id)}
								>
									Remove from card
								</button>
							</div>
							<div
								className={`absolute top-6 left-2 size-20 border-trello-border border rounded-full bg-trello-labels-${member.color} flex items-center justify-center`}
							>
								<p className='text-trello-text-h text-4xl font-semibold'>
									{member.firstName.substring(0, 1)}
									{member.lastName.substring(0, 1)}
								</p>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			))}
		</div>
	);
};

export default Avatar;
