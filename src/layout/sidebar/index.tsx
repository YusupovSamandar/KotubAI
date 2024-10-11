import { CloseOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Spin } from 'antd';
import { AddSquare, LogoutCurve } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { logout } from 'src/app/slices/authSlice';
import { changeMenuMode } from 'src/app/slices/layoutSlice';
import { useTypedSelector } from 'src/app/store';
import { Logo } from 'src/assets/svg';
import MenuItem from './components/MenuItem';
import MobileDrawer from './components/MobileDrawer';
import { sidebarLangData } from './langData';
import PaymentModal from './paymentModal';
import './sidebar.scss';
import useSidebar from '../useSidebar';

function LayoutSidebar() {
  const {
    colors,
    collapsed,
    isMobile,
    deviceType,
    lang,
    historyData,
    profileDetails,
    isProfileLoading,
    isLoading,
    userBalanceDisplay,
    navigate,
    dispatch,
    mode,
  } = useSidebar();

  return (
    <div className={`sidebar sidebar-${mode}`}>
      <div className="sidebar-top">
        <div className={`sidebar-title ${isMobile && 'sidebar-title-mobile'}`}>
          {!collapsed && (
            <div className="sidebar-logo-bar">
              <Link
                onClick={() => {
                  isMobile && dispatch(changeMenuMode());
                }}
                to="/"
                className="sidebar-title-logo"
              >
                <Logo />
              </Link>
              {isMobile ? (
                <Button
                  className="mobile-drawer-close"
                  onClick={() => dispatch(changeMenuMode())}
                  icon={<CloseOutlined style={{ fontSize: '20px' }} />}
                ></Button>
              ) : (
                <Link to="/">
                  <Button
                    className="add-new-workspace"
                    icon={<AddSquare size="24" color="#52edac" />}
                  />
                </Link>
              )}
            </div>
          )}
        </div>
        <div
          className="menu"
          style={
            isLoading
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {}
          }
        >
          {/* <MenuTitle title="Today" /> */}
          {isLoading ? (
            <div>
              <Spin />
            </div>
          ) : (
            historyData.map((item) => (
              <MenuItem
                key={item.id}
                label={item.name}
                path={`/${item.id}`}
                itemId={item.id}
              />
            ))
          )}
          {}
        </div>
      </div>
      <div className="sidebar-footer">
        {profileDetails && !isProfileLoading && (
          <div className="user-balance-container">
            <p>{userBalanceDisplay[lang].title}</p>
            <p>{userBalanceDisplay[lang].time}</p>
            <p>{Math.trunc(Number(profileDetails?.credit_sums))} so'm</p>
            <PaymentModal />
          </div>
        )}
        <br />
        {deviceType !== 'telegram' && (
          <Popconfirm
            title={sidebarLangData[lang].popupConfirmTitle}
            onConfirm={() => {
              dispatch(logout());
              navigate('/');
            }}
            okText={sidebarLangData[lang].confirm}
            cancelText={sidebarLangData[lang].cancel}
          >
            <div className="sidebar-footer-button" onClick={() => {}}>
              <LogoutCurve variant="Bold" size="24" color={colors.white} />{' '}
              {!collapsed && lang === 'uz'
                ? 'Chiqish'
                : lang === 'ru'
                ? 'Выйти'
                : 'Logout'}
            </div>
          </Popconfirm>
        )}
      </div>
    </div>
  );
}

export default function LayoutSidebarWithMobile() {
  const { isMobile } = useTypedSelector((state) => state.layout);
  return isMobile ? (
    <MobileDrawer>
      <LayoutSidebar />
    </MobileDrawer>
  ) : (
    <LayoutSidebar />
  );
}
