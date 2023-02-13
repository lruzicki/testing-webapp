import React from 'react';

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="main-layout">{children}</div>
);

export default MainLayout;
