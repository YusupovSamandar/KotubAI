import '../table.scss';

interface Props {
  children: React.ReactNode;
  blurs?: boolean;
  radius?: number;
}

function TableWrapper({ children, blurs = true, radius = 32 }: Props) {
  return (
    <div className="table-wrapper" style={{ borderRadius: radius }}>
      {blurs && (
        <div className="table-wrapper-blurs">
          <div className="table-wrapper-blurs-blue" />
          <div className="table-wrapper-blurs-gray" />
        </div>
      )}
      {children}
    </div>
  );
}

export default TableWrapper;
