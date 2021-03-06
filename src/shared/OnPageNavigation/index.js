import "./OnPageNavigation.scss";

import Button from "../Button";

export default function OnPageNavigation() {
  return (
    <div className="onPageNavigation">
      <nav className="links">
        <div className="nav-item">Профиль</div>
        <div className="nav-item">Турниры</div>
        <div className="nav-item">Команды</div>
      </nav>
      <div className="buttons">
        <Button class="black" text="Создать турнир" />
        <Button class="red rounded" text="Создать команду" />
      </div>
    </div>
  );
}
