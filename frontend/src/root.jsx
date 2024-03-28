// @refresh reload
import {
  Body,
  Head,
  Html,
  Meta,
  Scripts,
  Title,
} from "solid-start";

import "./styles/pms.css";

import RouterMain from "./components/routing/Router";
import NavBar from "./components/navbar";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>PMS | Project Management System</Title>
        
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Body>
        <NavBar/>
        <RouterMain/>
        <Scripts />
      </Body>
    </Html>
  );
}