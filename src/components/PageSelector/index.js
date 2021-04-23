import "./PageSelector.scss";

export default function PageSelector(props) {
  return (
    <div className="page-selector">
      <div className="arrow">←</div>
      <div className="current-page">{props.page}</div>
      <div className="arrow">→</div>
    </div>
  );
}
