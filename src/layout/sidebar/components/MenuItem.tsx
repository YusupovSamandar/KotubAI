import { ArrowUp2, Minus } from 'iconsax-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from 'src/app/store';
import { findSubKey } from 'src/layout/utill';

interface IMenuItem {
  path?: string;
  label: string;
  subKey?: string;
  children?: Partial<IMenuItem>[];
}

function MenuItem({ path, label, subKey, children }: IMenuItem) {
  const { colors, collapsed } = useTypedSelector((state) => state.layout);
  const parentPath = path?.split('/')?.[1];
  const location = useLocation();
  const active =
    location.pathname === path ||
    location.pathname.split('/')[1] === parentPath ||
    findSubKey(location.pathname) === subKey;

  //Children section
  const [open, setOpen] = useState(active);

  return (
    <div className={`menu-item ${active && 'menu-item-active'}`} key={path}>
      {/* Main menu item */}
      {children ? (
        <div className="menu-item-parent" onClick={() => setOpen(!open)}>
          <div className="menu-item-parent-left">
            -
            {!collapsed && <p>{label}</p>}
          </div>

          {!collapsed && (
            <div
              className={`menu-item-parent-right ${
                open && 'menu-item-parent-right-open'
              }`}
            >
              <ArrowUp2 size="20" color={colors.white} />
            </div>
          )}
        </div>
      ) : (
        <Link to={path || '/'} className="menu-item-parent">
          <div className="menu-item-parent-left">
            -
            {!collapsed && <p>{label}</p>}
          </div>
        </Link>
      )}

      {/* Menu item children */}
      {children && open && !collapsed && (
        <div className="menu-item-children">
          {children.map((item) => {
            return (
              <Link
                to={item.path || '/'}
                key={item.path}
                className={
                  location.pathname.split('/')[1] === item.path.split('/')[1]
                    ? 'menu-item-children-active'
                    : ''
                }
              >
                <Minus size="14" color="#909193" />
                <p>{item.label}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MenuItem;
