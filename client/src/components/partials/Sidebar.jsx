import { slide as Menu } from "react-burger-menu";

function Sidebar() {
  return (
    <Menu>
      <a href="#">Home</a>
      <a href="#">Salons</a>
      <a href="#">About</a>
    </Menu>
  );
}

export default Sidebar;
