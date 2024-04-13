import { GradientSvg } from 'src/assets/svg';
import '../table.scss';

interface Props {
  title: string;
}

function TableHeader({ title }: Props) {
  return (
    <div className="table-header">
      <GradientSvg />
      <h2>{title}</h2>
    </div>
  );
}

export default TableHeader;
