import { ArrowUp2, Minus } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import { findSubKey } from 'src/layout/utill';
import ActionsDropdown from './actionsDropdown';
import { changeMenuMode } from 'src/app/slices/layoutSlice';
import { useEditSpeechToTextTitleMutation } from 'src/app/services/uploads';

interface IMenuItem {
  path?: string;
  label: string;
  subKey?: string;
  children?: Partial<IMenuItem>[];
  itemId: number;
}

function MenuItem({ path, label, subKey, children, itemId }: IMenuItem) {
  const dispatch = useAppDispatch();
  const sendChangeTitle = () => {
    setIsEditable(false);
    const FormDTt = new FormData();
    FormDTt.append('id', itemId.toString());
    FormDTt.append('project_name', menuItemRef.current.innerText);
    updateTitle(FormDTt);
  };
  const menuItemRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const toggleEdit = () => {
    setIsEditable(true);
  };
  const handleKeyDownForEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default Enter behavior
      sendChangeTitle(); // Optionally save on Enter
    }
  };
  const { colors, collapsed, isMobile } = useTypedSelector(
    (state) => state.layout
  );
  const parentPath = path?.split('/')?.[1];
  const location = useLocation();
  const active =
    location.pathname === path ||
    location.pathname.split('/')[1] === parentPath ||
    findSubKey(location.pathname) === subKey;
  const [updateTitle] = useEditSpeechToTextTitleMutation();

  //Children section
  const [open, setOpen] = useState(active);
  useEffect(() => {
    if (isEditable) {
      const p = menuItemRef.current;
      p.focus();

      const range = document.createRange(); // Create a range
      const sel = window.getSelection(); // Get the current selection
      range.selectNodeContents(p); // Select the entire contents of the paragraph
      range.collapse(false); // Collapse the range to the end point. False means collapse to end rather than the start
      sel.removeAllRanges(); // Remove all ranges from the selection
      sel.addRange(range); // Add the new range
    }
  }, [isEditable]);
  return (
    <div className={`menu-item ${active && 'menu-item-active'}`} key={path}>
      {/* Main menu item */}
      {children ? (
        <div className="menu-item-parent" onClick={() => setOpen(!open)}>
          <div className="menu-item-parent-left">
            -{!collapsed && <p>{label}</p>}
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
        <div className="menu-item-parent">
          <Link
            onClick={() => {
              isMobile && dispatch(changeMenuMode());
            }}
            style={{ width: '100%' }}
            to={path || '/'}
          >
            <div className="menu-item-parent-left">
              -
              {!collapsed && (
                <p
                  className="menu-item-parent-left-p"
                  ref={menuItemRef}
                  onKeyDown={handleKeyDownForEnter}
                  onBlur={sendChangeTitle}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  style={{
                    outline: isEditable ? 'none' : 'none',
                    cursor: isEditable ? 'text' : 'pointer',
                  }}
                >
                  {label}
                </p>
              )}
            </div>
          </Link>
          <div className="menu-item-edit-options">
            <ActionsDropdown editClick={toggleEdit} itemId={itemId} />
          </div>
        </div>
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
