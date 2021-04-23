import "./TournamentsTable.scss";

import TournamentCard from "../TournamentCard";
import PageSelector from "../PageSelector";
import Button from "../Button";

import pencil from "../../assets/icn_pencil.svg";
import cross from "../../assets/icn_cross.svg";

export default function TournamentsTable(props) {
  return (
    <div className="tournaments-table">
      <div className="head">
        <div className="kludge"></div>
        <div className="head-item">
          Название
          <div className="filter-arrow">▼</div>
        </div>
        <div className="head-item">
          Команды<div className="filter-arrow">▼</div>
        </div>
        <div className="head-item filter up">
          Дата изменения<div className="filter-arrow">▼</div>
        </div>
        <div className="kludge"></div>
        <div className="head-item bold">Действие</div>
      </div>
      <div className="content">
        {props.tournaments.map((tournament) => {
          return (
            <div className="tournament">
              <TournamentCard
                title={tournament.title}
                subtitle={tournament.subtitle}
                teams={tournament.teams}
                date={tournament.date}
              />
              <div className="actions">
                <img src={pencil} alt="Изменить" />
                <img src={cross} alt="Удалить" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="actions">
        <PageSelector page="1" />
        <Button class="red" text="Создать турнир" />
      </div>
    </div>
  );
}
