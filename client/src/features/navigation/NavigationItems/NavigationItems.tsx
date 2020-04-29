import './NavigationItems.scss';
import React, { useState } from 'react';
import { Navbar, Nav, NavLink, NavItem, NavbarBrand, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

export const NavigationItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Navbar light expand="md">
      <NavbarBrand href="/">Daisyhub</NavbarBrand>
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink exact to="/" activeClassName="active" tag={RRNavLink}>
              Islands
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact to="/host" activeClassName="active" tag={RRNavLink}>
              Host
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact to="/join" activeClassName="active" tag={RRNavLink}>
              Join
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <NavbarToggler className="navigation__toggler" onClick={handleToggle}>
        <span className="navigation__toggler-icon"></span>
        <span className="navigation__toggler-icon"></span>
        <span className="navigation__toggler-icon"></span>
      </NavbarToggler>
    </Navbar>
  );
};
