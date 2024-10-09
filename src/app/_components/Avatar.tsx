import { Member } from '@/lib/utils';
import React from 'react';

interface AvatarProps {
	members: Member[];
}

const Avatar = ({ members }: AvatarProps) => {
	return (
		<div className='rounded-full '>
			<div></div>
		</div>
	);
};

export default Avatar;
