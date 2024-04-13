import { Breadcrumb, BreadcrumbProps, ConfigProvider } from 'antd';

import { Link } from 'react-router-dom';

function CustomBreadcrumb({ items, ...rest }: BreadcrumbProps) {
  items &&
    items.unshift({
      title: (
        <Link style={{ color: 'white' }} to="/">
          Home
        </Link>
      ),
    });
  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            fontSize: 14,
            itemColor: '#FFF',
            separatorColor: '#FFF',
            lastItemColor: '#FFF',
            separatorMargin: 6,
            colorText: '#FFF',
          },
        },
      }}
    >
      <Breadcrumb items={items} {...rest} />
    </ConfigProvider>
  );
}

export default CustomBreadcrumb;
