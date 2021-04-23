import "./Footer.scss";

import Logo from "../Logo";
import Navigation from "../Navigation";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <Logo class="white" />
        <Navigation class="white" />
      </div>
    </footer>
  );
}
