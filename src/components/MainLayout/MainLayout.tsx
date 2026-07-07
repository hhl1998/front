import type { ReactNode } from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return <main className="main-layout">{children}</main>;
}

export default MainLayout;
