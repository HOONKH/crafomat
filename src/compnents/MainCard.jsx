import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    // 링크 왜 day로 하는지 물어보기
    <Link to={`/${day}`}>
      <li>
        <span>{day}</span>
        <span>{title}</span>
      </li>
    </Link>
  );
};
export default MainCard;
