import { useEffect, useRef } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { changeCollapsed } from 'src/app/slices/layoutSlice';
import { useAppDispatch, useTypedSelector } from 'src/app/store';
import LayoutHeader from './header';
import './layout.scss';
import LayoutSidebar from './sidebar';

function DashboardLayout() {
  const { menuMode } = useTypedSelector((state) => state.layout);
  const dispatch = useAppDispatch();
  const toggleCollapsed = () => {
    if (menuMode === 'close') {
      dispatch(changeCollapsed(true));
    }
  };

  //Content scrool helper
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [searchParams]);

  return (
    <div className="layout">
      <LayoutSidebar />
      <div className="layout-right" onMouseEnter={toggleCollapsed}>
        <LayoutHeader />
        <div className="layout-content" ref={contentRef}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
