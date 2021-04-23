import "./Logo.scss";

export default function Logo(props) {
  return <div className={["logo", props.class].join(" ")}>[~]</div>;
}
