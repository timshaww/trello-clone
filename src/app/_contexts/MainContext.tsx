import { createContext, FC, ReactNode, useContext } from 'react';

interface MainContextProps {}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
	const context = useContext(MainContext);
	if (context === undefined) {
		throw new Error('useMainContext must be used within a MainProvider');
	}
	return context;
};
