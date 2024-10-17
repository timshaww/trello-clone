import { exampleBoard, exampleMemberTim } from '@/lib/exampleInfo';
import { Board, Member } from '@/lib/utils';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface MainContextProps {
	currentMember: Member | undefined;
	setCurrentMember: (member: Member) => void;
	boards: Board[];
	setBoards: (boards: Board[]) => void;
	getBoardById: (boardId: string) => Board | undefined;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currentMember, setCurrentMember] = useState<Member | undefined>(exampleMemberTim);
	const [boards, setBoards] = useState<Board[]>([exampleBoard]);
	const getBoardById = (boardId: string) => boards.find((board) => board.id === boardId);

	return <MainContext.Provider value={{ currentMember, setCurrentMember, boards, setBoards, getBoardById }}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
	const context = useContext(MainContext);
	if (context === undefined) {
		throw new Error('useMainContext must be used within a MainProvider');
	}
	return context;
};
