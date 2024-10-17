import { exampleBoard, exampleMemberTim } from '@/lib/exampleInfo';
import { Board, Member } from '@/lib/utils';
import { createContext, FC, ReactNode, useContext, useState, useEffect, useRef } from 'react';

interface MainContextProps {
	currentMember: Member | undefined;
	setCurrentMember: (member: Member) => void;
	boards: Board[];
	setBoards: (boards: Board[]) => void;
	getBoardById: (boardId: string) => Board | undefined;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
	// Load initial state from localStorage or fallback to example data
	const [currentMember, setCurrentMember] = useState<Member>(
		exampleMemberTim
		// () => {
		// 	const storedMember = localStorage.getItem('currentMember');
		// 	return storedMember ? JSON.parse(storedMember) : exampleMemberTim;
		// }
	);

	const [boards, setBoards] = useState<Board[]>(
		[exampleBoard]
		// () => {
		// const storedBoards = localStorage.getItem('boards');
		// return storedBoards ? JSON.parse(storedBoards) : [exampleBoard];
		// }
	);

	const getBoardById = (boardId: string) => boards.find((board) => board.id === boardId);

	// Store previous values in useRef to avoid unnecessary updates
	const previousMember = useRef(currentMember);
	const previousBoards = useRef(boards);

	// Save currentMember to localStorage when it changes, only if it's different from the previous value
	// useEffect(() => {
	// 	if (currentMember !== previousMember.current) {
	// 		localStorage.setItem('currentMember', JSON.stringify(currentMember));
	// 		previousMember.current = currentMember; // Update ref with new value
	// 	}
	// }, [currentMember]);

	// // Save boards to localStorage when they change, only if they're different from the previous value
	// useEffect(() => {
	// 	if (boards !== previousBoards.current) {
	// 		localStorage.setItem('boards', JSON.stringify(boards));
	// 		previousBoards.current = boards; // Update ref with new value
	// 	}
	// }, [boards]);

	return <MainContext.Provider value={{ currentMember, setCurrentMember, boards, setBoards, getBoardById }}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
	const context = useContext(MainContext);
	if (context === undefined) {
		throw new Error('useMainContext must be used within a MainProvider');
	}
	return context;
};
