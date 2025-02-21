import { Link, NavLink } from "react-router-dom";

export const PlainNavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <div>
            <Link to={`/`} className=" navbar-brand fw-bold">
              <img
                src="/images/title.png"
                alt="Sign In"
                className="img-fluid"
                style={{ maxWidth: "150px", height: "auto" }}
              />
            </Link>
          </div>
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
