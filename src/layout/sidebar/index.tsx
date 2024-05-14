import { Popconfirm, Button } from 'antd';
import { AddSquare, LogoutCurve } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { red } from '@ant-design/colors';
import { logout } from 'src/app/slices/authSlice';
import { changeMenuMode } from 'src/app/slices/layoutSlice';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { Logo } from 'src/assets/svg';
import MenuItem from './components/MenuItem';
import './sidebar.scss';
import { CloseOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useGetHistoryMutation } from 'src/app/services/uploads';
import { useEffect } from 'react';
import { Spin } from 'antd';
import MobileDrawer from './components/MobileDrawer';
import PaymentModal from './paymentModal';
import { useGetProfileMutation } from 'src/app/services/auth';

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = (seconds % 60).toString().slice(0, 2);
  return `${hours}:${minutes}:${secondsLeft}`;
};

function LayoutSidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getHistory, { isLoading }] = useGetHistoryMutation();
  const [getProfile, { isLoading: isProfileLoading }] = useGetProfileMutation();
  const { colors, collapsed, isMobile, deviceType } = useTypedSelector(
    (state) => state.layout
  );
  const lang = useTypedSelector((state) => state.language);
  const historyData = useTypedSelector((state) => state.userHistory);
  const profileDetails = useTypedSelector((state) => state.auth.profile);
  const userBalanceDisplay = {
    en: {
      title: 'Remaining Time:',
      time: formatTime(Number(profileDetails?.credit_seconds)),
    },
    uz: {
      title: 'Qolgan Vaqt :',
      time: formatTime(Number(profileDetails?.credit_seconds)),
    },
    ru: {
      title: 'Оставшееся время:',
      time: formatTime(Number(profileDetails?.credit_seconds)),
    },
  };

  useEffect(() => {
    getHistory().unwrap();
    getProfile().unwrap();
  }, []);

  const mode = collapsed ? 'close' : 'open';

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
                label={item.project_name}
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
            <PaymentModal />
          </div>
        )}
        <br />
        {deviceType !== 'telegram' && (
          <Popconfirm
            title="Do you confirm ?"
            onConfirm={() => {
              dispatch(logout());
              navigate('/');
            }}
            okText="Ha"
            cancelText="Yo'q"
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
