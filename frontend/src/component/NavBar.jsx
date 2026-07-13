import "./navBar.css";
import { Link } from "react-router-dom";
import { FaSearch, FaGlobe, FaUserCircle } from "react-icons/fa";
import { HiMenu, HiOutlineGift } from "react-icons/hi";
import { useState } from "react";
import { useEffect } from "react";
function NavBar() {
  const [user, updateUser] = useState(false);
  const [showMenu, updateMenu] = useState(false);
  const api = "http://localhost:3000/currentUser";

  async function currentUser() {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include", // tells the browser to send cookies (such as a JWT stored in an HTTP-only cookie) along with the request
      });
      const actualData = await response.json();
      console.log(actualData);
      if (actualData.success) {
        updateUser(actualData);
      } else {
        updateUser(null);
      }
    } catch (error) {
      updateUser(null);
      console.log(error);
    }
  }

  useEffect(() => {
    currentUser();
  }, []);

  function handleDropDown(e) {
    if (showMenu) {
      updateMenu(false);
    } else {
      updateMenu(true);
    }
  }
  return (
    <nav className="navbar">
      {/* Left */}

      <div className="navbar-logo">
        <Link to="/">
          <h2>AirStay</h2>
        </Link>
      </div>

      {/* Center */}

      <div className="navbar-search">
        <div className="search-item">
          <span>Anywhere</span>
        </div>

        <div className="divider"></div>

        <div className="search-item">
          <span>Any week</span>
        </div>

        <div className="divider"></div>

        <div className="search-item">
          <span>Add guests</span>
        </div>

        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Right */}

      <div className="navbar-right">
        <button className="host-btn">Become a Host</button>

        <button className="icon-btn">
          <FaGlobe />
        </button>

        <div className="profile-wrapper">
          <div className="profile-menu">
            {
              user ?
                <p onClick={handleDropDown}>{`Hi ${user.user.name}`}</p>
              : <HiMenu onClick={handleDropDown} />
              // user ? <FaUserCircle className="user-icon"  onClick={handleDropDown}></FaUserCircle> : <HiMenu onClick={handleDropDown} />
            }
          </div>

          {showMenu && (
            <div className="profile-dropdown">
              {user ?
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/my-bookings">My Bookings</Link>
                  <Link to="/wishlist">Wishlist</Link>
                  <Link to="/my-listings">My Listings</Link>

                  <button className="logout-btn">Logout</button>
                </>
              : <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              }
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
