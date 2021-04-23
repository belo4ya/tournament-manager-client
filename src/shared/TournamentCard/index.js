import "./TournamentCard.scss";

export default function TournamentCard(props) {
  return (
    <div className="tournament-card">
      <div className="title-container">
        <img src={props.image} alt="" />
        <div className="title">
          <h3>{props.title}</h3>
          <span className="subtitle">{props.subtitle}</span>
        </div>
      </div>
      <div className="teams">
        <h3>{props.teams}</h3>
        <span className="subtitle">Teams</span>
      </div>
      <div className="date">{props.date}</div>
    </div>
  );
}
