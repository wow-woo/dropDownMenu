import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <NavBar>
      <NavItem icon="a" />
      <NavItem icon="b" />
      <NavItem icon="c" />

      <NavItem icon="d">
        <DropdownMenu />
      </NavItem>
    </NavBar>
  );
}

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}
function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    console.log("el", el);
    const height = el.offsetHeight;
    console.log(height);
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        {props.leftIcon && (
          <span className="icon-button">{props.leftIcon}</span>
        )}

        {props.children}

        {props.rightIcon && (
          <span className="icon-button">{props.rightIcon}</span>
        )}
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        classNames="menu-primary"
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={"🧱"}>my profile</DropdownItem>
          <DropdownItem leftIcon={"⚙"} goToMenu="settings">
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        classNames="menu-secondary"
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={"<"} goToMenu="main" />
          <DropdownItem goToMenu="setting1">language</DropdownItem>
          <DropdownItem>notification</DropdownItem>
          <DropdownItem>channel</DropdownItem>
          <DropdownItem>supports</DropdownItem>
          <DropdownItem>colors</DropdownItem>
          <DropdownItem>fonts</DropdownItem>
          <DropdownItem>version</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        classNames="menu-third"
        in={activeMenu === "setting1"}
        unmountOnExit
        timeout={500}
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem rightIcon={"<"} goToMenu="settings" />
          <DropdownItem>english</DropdownItem>
          <DropdownItem>korean</DropdownItem>
          <DropdownItem>english</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
