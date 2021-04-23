import "./ParticipantsList.scss";

export default function ParticipantsList(props) {
  return (
    <div className="participants-list">
      {props.teams.map((team) => {
        return (
          <div className="team">
            <span>#{team.id}</span>|<p>{team.title}</p>|
            <div className="close">X</div>
          </div>
        );
      })}
      <input type="text" placeholder="Введите команду" />
      <div className="clear">X</div>
    </div>
  );
}
