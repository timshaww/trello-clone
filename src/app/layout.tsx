'use client';

import type { Metadata } from 'next';
import './globals.css';
import { MainProvider } from './_contexts/MainContext';

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
