import "./Navigation.scss";

import Button from "../Button";

export default function Navigation(props) {
    return (
        <nav className={["navigation", props.class].join(" ")}>
            <div className="nav-item">Главная</div>
            <div className="nav-item">О сервисе</div>
            <div className="nav-item">Об авторе</div>
            <Button class="white">Создать турнир</Button>
        </nav>
    );
}
