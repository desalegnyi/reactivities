import * as React from "react";
import { Component } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import "./styles.css";

interface Props{
  openForm: () => void;
}

export default function NavBar({openForm}: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="App Logo"
            style={{ marginRight: 10 }}
          ></img>
          Reactvities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={openForm} positive content="Add Activity"></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
