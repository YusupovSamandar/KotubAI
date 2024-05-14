import { Dropdown, MenuProps } from 'antd';
import { ArrowDown2, User } from 'iconsax-react';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { changeLanguage } from 'src/app/slices/languageSlice';
import './header.scss';
import { changeMenuMode } from 'src/app/slices/layoutSlice';
import { OpenBarSvg } from 'src/assets/svg';

function LayoutHeader() {
  const currentLang = useTypedSelector((state) => state.language);
  const { colors, menuMode } = useTypedSelector((state) => state.layout);
  const { profile } = useTypedSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const item2: MenuProps['items'] = [
    {
      key: '1',
      label: 'Oʻzbekcha',
      onClick: () => {
        dispatch(changeLanguage('uz'));
      },
    },
    {
      key: '2',
      label: 'Русский',
      onClick: () => {
        dispatch(changeLanguage('ru'));
      },
    },
    {
      key: '3',
      label: 'English',
      onClick: () => {
        dispatch(changeLanguage('en'));
      },
    },
  ];
  const LanguageDropdown = () => {
    return (
      <Dropdown trigger={['click']} menu={{ items: item2 }} placement="bottom">
        <a onClick={(e) => e.preventDefault()}>
          <div className="selectbtn">
            <h2>{currentLang}</h2>
            <ArrowDown2 size="16" color={colors.white} />
          </div>
        </a>
      </Dropdown>
    );
  };

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
            <LanguageDropdown />
            <User size="18" color="#fff" variant="Broken" />
          </div>
          <div className="flex">
            <h3>
              {profile?.first_name} {profile?.last_name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutHeader;
