import { ChevronLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import AddBoard from './AddBoard';

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	const [isAddBoardOpen, setIsAddBoardOpen] = useState<boolean>(false);

	return (
		<div className={`flex flex-col h-full ${isSidebarOpen ? 'w-[260px]' : 'w-[16px]'} bg-trello-bg `}>
			{isSidebarOpen ? (
				<div className='flex flex-col h-full border-r border-trello-border'>
					<div className='flex flex-row h-[57px] w-full justify-between border-b border-trello-border items-center px-3 py-2'>
						<div className='flex flex-row items-center'>
							<div className='flex size-8 bg-gradient-to-t from-[#216E4E] to-[#4BCE97] text-trello-bg font-bold text-xl rounded items-center justify-center'>
								T
							</div>
							<div className='flex flex-col text-trello-text-p ml-2 mr-1'>
								<h1 className='font-semibold text-sm'>Tim's Workspace</h1>
								<p className='text-xs'>Free</p>
							</div>
						</div>
						<ChevronLeft
							className='cursor-pointer text-trello-text-p hover:bg-trello-hover size-8 p-1.5 rounded'
							onClick={() => setIsSidebarOpen(false)}
						/>
					</div>
					<div className='flex flex-row w-full px-3 py-2 text-trello-text-p items-center justify-between'>
						<h1 className='font-semibold text-sm'>Your boards</h1>
						<AddBoard side='right' open={isAddBoardOpen} setOpen={setIsAddBoardOpen}>
							<div onClick={() => setIsAddBoardOpen(true)}>
								<Plus className='cursor-pointer text-trello-text-p hover:bg-trello-hover size-6 p-1 rounded' />
							</div>
						</AddBoard>
					</div>
				</div>
			) : (
				<div className='hover:bg-trello-hover size-full border-r border-trello-border cursor-pointer' onClick={() => setIsSidebarOpen(true)}>
					{/* <div
						className='rounded-full size-[24px] border border-trello-border ml-1 mt-4 bg-trello-bg flex items-center justify-center cursor-pointer '
						onClick={() => setIsSidebarOpen(true)}
					>
						<ChevronRight className='text-trello-text-p size-4' />
					</div> */}
				</div>
			)}
		</div>
	);
};

export default Sidebar;
