import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from 'src/app/store';
import { findDashboardPageTitle } from '../utill';
import './content.scss';

interface Props {
  title?: string;
  children?: React.ReactNode;
  links?: { title: React.ReactNode }[];
  parent?: string;
  detail?: string;
}

function ContentTop({ title, children, parent, detail }: Props) {
  const location = useLocation();
  const defTitle = findDashboardPageTitle(location.pathname);
  const { hasCompany } = useTypedSelector((state) => state.auth);

  // Breadcrumb items
  const [items, setItems] = useState([
    {
      title: <Link to="/">Bosh sahifa</Link>,
    },
    {
      title: hasCompany ? (
        parent ? (
          <Link to={parent}>{defTitle}</Link>
        ) : (
          title || defTitle
        )
      ) : (
        'Company'
      ),
    },
  ]);

  useEffect(() => {
    if (detail) setItems([...items, { title: detail }]);
  }, [detail]);

  return (
    <div className="content-top">
      <Breadcrumb items={items} />
      {!!children && <div className="content-top-children">{children}</div>}
    </div>
  );
}

export default ContentTop;
