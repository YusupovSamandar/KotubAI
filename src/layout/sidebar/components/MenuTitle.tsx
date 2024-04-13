interface Props {
  title: string;
}

function MenuTitle({ title }: Props) {
  return <div className="menu-title">{title}</div>;
}

export default MenuTitle;
