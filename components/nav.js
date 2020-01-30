import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  Navbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
} from "reactstrap";
import Cookies from 'js-cookie';
import { signout } from "../lib/auth";
import Search from "../components/Search";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const SearchNav = () => {
  const logout = () => {
    signout();
  }
  const moveHome = () => Router.push('/mobile/map');
  const moveAdd = () => Router.push('/mobile/add');
  const moveShare = () => Router.push('/mobile/share');

  return (
    <div>
      <Navbar className="d-flex justify-content-between" color="light" light expand="md">
        <Search />
        <UncontrolledDropdown inNavbar className='ml-2'>
          <DropdownToggle tag="a">
            <FontAwesomeIcon icon={faEllipsisH} size='lg'/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={moveHome}>나만의 음식점</DropdownItem>
            <DropdownItem onClick={moveAdd}>음식점 추가하기</DropdownItem>
            <DropdownItem onClick={moveShare}>공유하기</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>로그아웃</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>
    </div>
  );
};

export const Nav = ({title}) => {
  const moveHome = () => Router.push('/mobile/map');
  const moveAdd = () => Router.push('/mobile/add');
  const moveShare = () => Router.push('/mobile/share');
  const logout = () => {
    signout();
  }
  
  return (
    <div>
      <Navbar className="d-flex justify-content-between" color="light" light expand="md">
        <NavbarBrand className="font-weight-bold">{title}</NavbarBrand>
        <UncontrolledDropdown inNavbar className='ml-2'>
          <DropdownToggle tag="a">
            <FontAwesomeIcon icon={faEllipsisH} size='lg' />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={moveHome}>나만의 음식점</DropdownItem>
            <DropdownItem onClick={moveAdd}>음식점 추가하기</DropdownItem>
            <DropdownItem onClick={moveShare}>공유하기</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>로그아웃</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>

      <style jsx>
        {`

        `}
      </style>
    </div>
  );
};
