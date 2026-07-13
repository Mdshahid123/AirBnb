import "./navBar.css";
import { Link } from "react-router-dom";
import { FaSearch, FaGlobe, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useEffect, useState } from "react";

function NavBar() {

  const [userData, setUserData] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  async function getCurrentUser() {
    try {
      const api = "http://localhost:3000/currentUser";
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // tells the browser to send cookies (such as a JWT stored in an HTTP-only cookie) along with the request
      });

      const resData = await response.json();
      console.log(resData)
      if(resData.success)
      {
        setUserData(resData);
         
      }
      else{
          setUserData(null) 
      }
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  function handleProfileMenu() {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
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
          <div className="profile-menu" onClick={handleProfileMenu}>
            {
            userData ?
            <FaUserCircle className="user-icon" />
              :
              <HiMenu />
            }
          </div>

          {showMenu && (
            <div className="profile-dropdown">
              {userData ?
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
