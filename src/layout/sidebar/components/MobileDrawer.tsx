import React from 'react';
import { Button, Drawer } from 'antd';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { changeMenuMode } from 'src/app/slices/layoutSlice';

interface MobileDrawerProps {
  children: React.ReactNode;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { collapsed } = useTypedSelector((state) => state.layout);

  const onClose = () => {
    dispatch(changeMenuMode());
  };

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
