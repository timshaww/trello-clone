import { Grip } from 'lucide-react';
import React from 'react';

const NavBar = () => {
	return (
		<div className='h-12 w-full p-2 flex flex-row justify-between items-center'>
			<div className='flex flex-row gap-5'>
				<Grip />
				<h1>Trello</h1>
				<div>Workspaces</div>
				<div>Recent</div>
				<div>Starred</div>
				<button>Create</button>
			</div>
			<div className='flex flex-row gap-5'>
				<input type='text' className='border' />
				<div>Avatar</div>
			</div>
		</div>
	);
};

export default NavBar;
