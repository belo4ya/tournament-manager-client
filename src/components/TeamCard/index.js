import "./TeamCard.scss";

export default function TeamCard(props) {
  return (
    <div className="team-card">
      <h6>{props.name}</h6>
      <img src={props.logo} alt="" />
      <p>#{props.rating}</p>
    </div>
  );
}
