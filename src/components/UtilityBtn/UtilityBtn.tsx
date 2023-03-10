import ReactTooltip from "react-tooltip";
import { IconType } from "react-icons";

interface Props {
  Icon: IconType;
  label: string;
  uniqueId: string;
  classes?: string;
  iconSize?: number;
  iconColor?: string;
  iconFillColor?: string;
  iconClasses?: string;
  isSubmitting?: boolean;
  onClick?: Function;
  text?: string;
  disabled?: boolean;
  color?: string;
  tooltipPosition?: "bottom" | "right" | "left" | "top";
}

const UtilityBtn = ({
  Icon,
  text,
  label,
  uniqueId,
  classes,
  iconColor,
  disabled,
  iconFillColor,
  iconSize = 18,
  iconClasses,
  onClick,
  isSubmitting = false,
  color = "primary",
  tooltipPosition = "bottom",
}: Props) => {
  return (
    <>
      <button
        type="button"
        data-tip
        data-for={uniqueId}
        aria-label={label}
        onClick={(e) => onClick && onClick(e)}
        className={`
       flex items-center justify-center gap-x-1 disabled:opacity-30 ${
         isSubmitting === false
           ? `hover:bg-${color}-50 hover:border-${color}-200 hover:text-${color}-600`
           : ``
       }   ${classes}`}
        disabled={isSubmitting || disabled ? true : false}
      >
        <Icon
          color={iconColor ? iconColor : "currentColor"}
          fill={iconFillColor ? iconFillColor : "none"}
          size={iconSize}
          className={`icon ${iconClasses}`}
        />
        <span>{text}</span>
      </button>
      {label && (
        <ReactTooltip
          id={uniqueId}
          place={tooltipPosition}
          effect="solid"
          className="bg-gray-700"
        >
          <span className="capitalize">{label}</span>
        </ReactTooltip>
      )}
    </>
  );
};

export default UtilityBtn;
