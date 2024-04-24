import React from 'react';
import { Drawer } from 'antd';
import { useTypedSelector } from 'src/app/store';

interface MobileDrawerProps {
  children: React.ReactNode;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ children }) => {
  const { collapsed } = useTypedSelector((state) => state.layout);

  return (
    <>
      <Drawer
        className="sidebar-mobile-drawer"
        width={'100%'}
        closable={false}
        open={!collapsed}
        placement="left"
      >
        {children}
      </Drawer>
    </>
  );
};

export default MobileDrawer;
