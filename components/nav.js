import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Cookies from 'js-cookie';
import { signout } from "../lib/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const Navigation = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setAuthentication] = useState(false);
  const token = Cookies.get("token");
  const username = Cookies.get("username");
  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    signout();
    setAuthentication(false);
  }

  useEffect(() => {
    if(!!token) setAuthentication(true);
  }, [token]);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Better Gourmet</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {username}
                </DropdownToggle>
                <DropdownMenu right>
                  <Link href="/mymap">
                    <DropdownItem>내 지도</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem onClick={logout}>로그아웃</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <React.Fragment>
                <NavItem className="mx-3">
                  <Link href="/login">
                    <Button color="primary">로그인</Button>
                  </Link>
                </NavItem>
                <NavItem>
                  <a href="signup">
                    <Button color="primary">가입하기</Button>
                  </a>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation
