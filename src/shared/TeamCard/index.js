import "./TeamCard.scss";

export default function TeamCard(props) {
  return (
    <div className="team-card">
      <h4>{props.title}</h4>
      <img src="" alt="" />
      <span>#{props.id}</span>
    </div>
  );
}
