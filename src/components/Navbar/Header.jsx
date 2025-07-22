import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase.js'; // Updated import
import '../../styles/index.css';
import logo from '../../assets/icons/Logo.svg';
import cartIcon from '../../assets/icons/cart.png';

// Styled-components
const HeaderContainer = styled.header`
  background-color: var(--Navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
`;

const LogoContainer = styled.div`
  padding: 1.5% 5%;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-right: 4%;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 2.625rem;
  font-family: "Archivo Narrow";
  &:hover {
    color: var(--text-1);
  }
`;

const UserName = styled.span`
  color: #ffffff;
  font-size: 2.625rem;
  font-family: "Archivo Narrow";
  cursor: pointer;
  &:hover {
    color: var(--text-1);
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000000;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PopupText = styled.p`
  font-size: 1.5rem;
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  text-align: center;
`;

const PopupButton = styled.button`
  background-color: var(--box, #999358);
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem;
  font-family: "Tenor Sans", sans-serif;
  color: #FFFFFF;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const CartContainer = styled.div`
`;

const LogoIcon = styled.img`
  height: 5.5rem;
  width: auto;
`;

const CartIcon = styled.img`
  height: 2.5rem;
  width: auto;
`;

const Header = () => {
  const location = useLocation();
  const isSignUpPage = location.pathname === '/signup';
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('Auth state changed:', currentUser ? currentUser.email : 'No user');
    }, (error) => {
      console.error('Auth state error:', error);
    });
    return () => unsubscribe();
  }, []);

  const handleLogoutClick = () => {
    setShowPopup(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowPopup(false);
      navigate('/signup', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const authLinkText = isSignUpPage ? 'Log In' : 'Sign Up';
  const authLinkPath = isSignUpPage ? '/login' : '/signup';

  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoIcon src={logo} alt="Logo" />
      </LogoContainer>
      <NavContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user ? (
            <UserName onClick={handleLogoutClick}>
              {user.displayName || user.email.split('@')[0]}
            </UserName>
          ) : (
            <NavLink to={authLinkPath}>{authLinkText}</NavLink>
          )}
        </NavLinks>
        <CartContainer>
          <Link to="/order">
            <CartIcon src={cartIcon} alt="Cart" />
          </Link>
        </CartContainer>
      </NavContainer>
      {showPopup && (
        <Popup>
          <PopupText>Do you want to log out?</PopupText>
          <PopupButton onClick={handleLogout}>Yes</PopupButton>
          <PopupButton onClick={handleCancel}>No</PopupButton>
        </Popup>
      )}
    </HeaderContainer>
  );
};

export default Header;