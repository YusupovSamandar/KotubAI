import { useEffect, useRef } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import LayoutHeader from './header';
import './layout.scss';
import LayoutSidebar from './sidebar';

function DashboardLayout() {
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
      <div className="layout-right">
        <LayoutHeader />
        <div className="layout-content" ref={contentRef}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
