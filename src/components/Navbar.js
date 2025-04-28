import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "10px" }}>
        Home
      </Link>
      <Link to="/users" style={{ marginRight: "10px" }}>
        Users
      </Link>
      <Link to="/add-user">Add User</Link>
    </nav>
  );
}
export default Navbar;
