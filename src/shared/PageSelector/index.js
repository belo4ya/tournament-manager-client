import "./PageSelector.scss";

export default function PageSelector(props) {
  return (
    <div className="page-selector">
      <div className="arrow" onClick={props.onPrevPage}>←</div>
      <div className="current-page">{props.page}</div>
      <div className="arrow" onClick={props.onNextPage}>→</div>
    </div>
  );
}
