import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="brand">
        <img
          width="20rem"
          height="20rem"
          src="https://cdn-icons-png.flaticon.com/512/9313/9313240.png"
          alt=""
        />
        <p>TURNERS</p>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <a className="nav-link" href="/">
              HOME
            </a>
          </li>
          <li>
            <a className="nav-link" href="/">
              LOREM
            </a>
          </li>
          <li>
            <a className="nav-link" href="/">
              IPSUM
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
