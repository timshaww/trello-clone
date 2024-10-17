'use client';

import { MainProvider } from './_contexts/MainContext';
import './globals.css';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	);
}
