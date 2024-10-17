import { useState } from 'react';

const Menu = () => {
	const [isMenuOpen] = useState<boolean>(false);
	return <div className={`flex flex-col h-full ${isMenuOpen ? 'w-[260px]' : 'w-[0px]'}`}>{isMenuOpen ? <div>Menu</div> : <div></div>}</div>;
};

export default Menu;
