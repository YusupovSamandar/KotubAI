import { Popconfirm } from 'antd';
import { Chart1, LogoutCurve } from 'iconsax-react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'src/app/slices/authSlice';
import { changeCollapsed } from 'src/app/slices/layoutSlice';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { Logo } from 'src/assets/svg';
import MenuItem from './components/MenuItem';
import './sidebar.scss';
import { useGetHistoryMutation } from 'src/app/services/uploads';
import { useEffect } from 'react';
import { Spin } from 'antd';

function LayoutSidebar() {
  const [getHistory, { isLoading }] = useGetHistoryMutation();
  const navigate = useNavigate();
  const { colors, menuMode, collapsed } = useTypedSelector(
    (state) => state.layout
  );
  const historyData = useTypedSelector((state) => state.userHistory);
  const dispatch = useAppDispatch();
  const toggleCollapsed = () => {
    if (menuMode === 'close') {
      dispatch(changeCollapsed(false));
    }
  };

  useEffect(() => {
    getHistory().unwrap();
  }, []);

  const mode = collapsed ? 'close' : 'open';
  return (
    <div className={`sidebar sidebar-${mode}`} onMouseEnter={toggleCollapsed}>
      <div className="sidebar-top">
        <div className="sidebar-title">
          {!collapsed && (
            <Link to="/" className="sidebar-title-logo">
              <Logo />
            </Link>
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
            <LogoutCurve size="24" color={colors.white} />{' '}
            {!collapsed && 'sign out'}
          </div>
        </Popconfirm>
      </div>
    </div>
  );
}

export default LayoutSidebar;
