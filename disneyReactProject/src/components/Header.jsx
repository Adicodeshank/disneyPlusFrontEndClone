import styled from "styled-components";
import React, { useEffect } from "react";
import { app } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
// We can read data from the store with useSelector, and dispatch actions using useDispatch
import { useSelector, useDispatch } from "react-redux";
// usenavigate is a React Hook from React Router v5 that gives you access to the browser's navigate object, which lets you navigate between routes/pages programmatically.=> uselocation  is useNavigate
import { useNavigate } from "react-router";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
          console.log(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      signOut(auth)
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  // Here's what happens:
  // setUserLoginDetails() creates an action object with a type and a payload.
  // dispatch() sends this action to the store.
  // Redux sees this action and uses the reducer (from your slice) to update the state.
  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  console.log("Redux userPhoto:", userPhoto);
  console.log("Redux userName:", userName);
  
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        console.log("coming to home ");
        navigate("/home"); // 🧭 navigates to /home => router taking you to /home page
        //  What .push('/home') Does:
        // It adds /home to your browser’s navigate stack Just like clicking a <Link to="/home" /> It triggers React Router to re-render and show the /home route
      }
    });
  }, [userName]);

  return (
    <>
      <Nav>
        <Logo>
          <img src="./public/images/logo.svg" alt="disneylogo" />
        </Logo>
        {!userName ? (
          <Login onClick={handleAuth}>Login</Login>
        ) : (
          <>
            <NavMenu>
              <a href="/home">
                <img src="./public/images/home-icon.svg" alt="HOME" />
                <span>HOME</span>
              </a>
              <a>
                <img src="./public/images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
              </a>
              <a>
                <img src="./public/images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>WATCHLIST</span>
              </a>
              <a>
                <img src="./public/images/original-icon.svg" alt="ORIGINALS" />
                <span>ORIGINALS</span>
              </a>
              <a>
                <img src="./public/images/movie-icon.svg" alt="MOVIES" />
                <span>MOVIES</span>
              </a>
              <a>
                <img src="./public/images/series-icon.svg" alt="SERIES" />
                <span>SERIES</span>
              </a>
            </NavMenu>
            <SignOut>
              <UserImg src={userPhoto} alt={userName} />
              <DropDown>
                <span onClick={handleAuth}>Sign out</span>
              </DropDown>
            </SignOut>
          </>
        )}
      </Nav>
      ;
    </>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center; // vertically align
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  height:97.5px;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end; // horizontal align
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      /* The & symbol refers to the current selector you're inside. */
      &:before {
        // for animation of line below home link and other link
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        opacity: 0;
        position: absolute;
        right: 0px;
        left: 0px;
        transform-origin: left center; // Scale animation will start from the left
        transform: scaleX(
          0
        ); // scale is changing from 0 to 1 for showing the transition
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s; // Smooth animation settings
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
        /* !important => "Make this opacity 1, and override anything else that tries to change it — no matter what." */
      }
    }
  }

  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  color: white;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  color: white;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center; // vertically align
  justify-content: center; // horizontally align

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
