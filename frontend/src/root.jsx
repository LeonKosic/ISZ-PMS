// @refresh reload
import {
  Body,
  Head,
  Html,
  Meta,
  Scripts,
  Title,
  Link,
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
        
        <Link rel="preconnect" href="https://fonts.googleapis.com"/>
        <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <Link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Jomolhari&family=Taviraj:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>
      
      <Body>
        <NavBar/>
        <RouterMain/>
        <Scripts />
      </Body>
    </Html>
  );
}