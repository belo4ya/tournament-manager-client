import "./Header.scss";

import Logo from "../Logo";
import Navigation from "../Navigation";
import Button from "../Button";

export default function Header() {
  return (
    <header>
      <div className="container">
        <Logo class="black" />
        <Navigation />
        <div className="auth">
          <Button text="Вход" />
          <Button class="rounded black" text="Регистрация" />
        </div>
      </div>
    </header>
  );
}
