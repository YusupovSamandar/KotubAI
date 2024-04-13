import { Dropdown, MenuProps } from 'antd';
import {
  ArrowDown2,
  NotificationBing,
  TextalignJustifyleft,
  User,
} from 'iconsax-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import FilterSearch from 'src/components/filter/FilterSearch';
import './header.scss';
import { changeMenuMode } from 'src/app/slices/layoutSlice';
import { OpenBarSvg } from 'src/assets/svg';

function LayoutHeader() {
  const { colors, menuMode } = useTypedSelector((state) => state.layout);
  const { profile } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const item2: MenuProps['items'] = [
    {
      key: '1',
      label: 'Oʻzbekcha',
    },
    {
      key: '2',
      label: 'Русский',
    },
    {
      key: '3',
      label: 'Кирилча',
    },
  ];
  const items: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <Dropdown
          trigger={['click']}
          menu={{ items: item2 }}
          placement="bottomCenter"
        >
          <div className="selectbtn">
            <h2>Language</h2>
            <ArrowDown2 size="16" color={colors.white} />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="header">
      <div className="header-left">
        <div
          className={`header-mode header-mode-${menuMode}`}
          onClick={() => dispatch(changeMenuMode())}
        >
          <OpenBarSvg />
        </div>
      </div>

      <div className="header__right">
        <div className="header__user">
          <div className="header__user-icon">
            <User size="18" color="#fff" variant="Broken" />
          </div>
          <div className="flex">
            <h3>
              {profile?.first_name} {profile?.last_name}
            </h3>
            <p>{profile?.position === 'ceo' ? 'Project manager' : ''}</p>
          </div>
        </div>

        <Link to="/notifications">
          <div className="header-circle">
            <NotificationBing size="20" color={colors.white} variant="Bold" />
            <p></p>
          </div>
        </Link>

        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={['click']}
          arrow
        >
          <div className="header-circle">
            <span />
            <span />
            <span />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default LayoutHeader;
