import { exampleBoard, exampleMemberTim } from '@/lib/exampleInfo';
import { Board, Member } from '@/lib/utils';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface MainContextProps {
	currentMember: Member | undefined;
	setCurrentMember: (member: Member) => void;
	board: Board;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currentMember, setCurrentMember] = useState<Member | undefined>(exampleMemberTim);
	const board: Board = exampleBoard;

	return <MainContext.Provider value={{ currentMember, setCurrentMember, board }}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
	const context = useContext(MainContext);
	if (context === undefined) {
		throw new Error('useMainContext must be used within a MainProvider');
	}
	return context;
};
