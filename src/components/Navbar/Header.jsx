import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/index.css';
import logo from '../../assets/icons/Logo.svg';
import cartIcon from '../../assets/icons/cart.png';

// Styled-components for the header
const HeaderContainer = styled.header`
  background-color: var(--Navbar);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow-x: hidden; // Prevent horizontal scrolling
`;

const LogoContainer = styled.div`
  padding: 1.5% 5% ; // 0% padding as specified
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem; // Reduced from 2rem to shift links left
  margin-right: 4%;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem; // Reduced from 2rem to prevent offscreen overflow
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 2.625rem; // 42px converted to rem (42/16)
  font-weight: 500;
  &:hover {
    color: var(--text-1);
  }
`;

const CartContainer = styled.div`
`;

const LogoIcon = styled.img`
  height: 4.5rem; // Increased from 3rem to ~3.2rem (6.67% larger)
  width: auto;
`;

const CartIcon = styled.img`
  height: 2.5rem; // Unchanged, as specified
  width: auto;
`;

const Header = () => {
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
          <NavLink to="/signup">Sign Up</NavLink>
        </NavLinks>
        <CartContainer>
          <Link to="/order">
            <CartIcon src={cartIcon} alt="Cart" />
          </Link>
        </CartContainer>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;