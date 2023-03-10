import { FormattedMessage } from "react-intl";
import { NavLink, useMatch } from "react-router-dom";
import { TranslateObj } from "../../types";

interface Props {
  to: string;
  textObj: TranslateObj;
}

const TabLink = ({ to, textObj }: Props) => {
  const isActive = useMatch(encodeURI(to));

  return (
    <li
      className={`noselect cursor-pointer font-medium font-sans inline-block first:rounded-l last:rounded-r ${
        isActive
          ? "text-white bg-primary shadow-lg"
          : " bg-gray-200 text-gray-800 text-primary_black"
      }`}
    >
      <NavLink to={to} className={`inline-block px-4 py-3`}>
        <span>{<FormattedMessage {...textObj} />}</span>
      </NavLink>
    </li>
  );
};

export default TabLink;
