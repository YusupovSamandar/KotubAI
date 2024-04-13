import '../table.scss';

interface Props {
  title: string;
  value: string;
}

function TableFooter({ title, value }: Props) {
  return (
    <div className="table-footer">
      <p>{title}</p>
      <span>{value}</span>
    </div>
  );
}

export default TableFooter;
