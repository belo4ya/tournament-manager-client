import "./TeamCard.scss";

export default function TeamCard(props) {
  return (
    <div className="team-card">
      <h6>{props.title}</h6>
      <img src="" alt="" />
      <p>#{props.id}</p>
    </div>
  );
}
