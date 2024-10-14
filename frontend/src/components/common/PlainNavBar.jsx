import { Link, NavLink } from "react-router-dom";

export const PlainNavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <Link to={`/`} className=" navbar-brand fw-bold">
            Roommates
          </Link>
          <div className="navbar-nav justify-content-end">
            <NavLink to={`/login`} className="nav-link">
              Sign In
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};
