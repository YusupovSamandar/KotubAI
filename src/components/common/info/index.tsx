import './info.scss';

interface Props {
  info: string;
  type?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  minWidth?: number;
  width?: number | string;
}

function CustomInfo({
  info,
  type = 'primary',
  minWidth = 0,
  width = 'auto',
}: Props) {
  return (
    <div
      className={`custom-info ${'custom-info-' + type}`}
      style={{ minWidth, width }}
    >
      {info}
    </div>
  );
}

export default CustomInfo;
