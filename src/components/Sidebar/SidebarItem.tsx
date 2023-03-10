import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import ReactTooltip from "react-tooltip";
import { FormattedMessage } from "react-intl";

interface Props {
  to: string;
  text: string;
  translateId: string;
  shortText: string;
  Icon: IconType;
  iconSize?: string;
}

const SidebarItem = ({
  to,
  shortText,
  translateId,
  text,
  Icon,
  iconSize,
}: Props) => {
  const { show } = useSidebar();

  return (
    <li className="noselect last:mb-4" data-tip data-for={text}>
      <NavLink
        to={to}
        className={({ isActive }) => {
          return `text-center rounded-md font-sans ${
            isActive
              ? "bg-primary text-white shadow-lg"
              : "hover:bg-primary text-gray-300 hover:text-white"
          } flex w-full px-4 gap-x-2 ${
            show
              ? `items-center justify-start h-14`
              : "flex-col justify-center items-center h-14"
          }`;
        }}
      >
        <Icon size={iconSize || show ? 22 : 26} />
        <span className={`${show ? "block" : "hidden"}`}>
          <FormattedMessage id={translateId} defaultMessage={text} />
        </span>

        {!show && (
          <ReactTooltip id={text} place="right" type="dark" effect="solid">
            <span>
              <FormattedMessage id={translateId} defaultMessage={text} />
            </span>
          </ReactTooltip>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarItem;
