import React from "react";
import ReactTooltip from "react-tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules
import { Controller } from "react-hook-form";

interface Props {
  label: string;
  id: string;
  name: string;
  control: any;
  classes?: string;
  outerClasses?: string;
  helpText?: string;
  disabled?: boolean;
  showIcons?: boolean;
}

const ToggleButton = ({
  label,
  id,
  name,
  control,
  classes,
  outerClasses,
  helpText,
  disabled = false,
  showIcons = true,
}: Props) => {
  return (
    <div className={`toggle-button flex items-center ${outerClasses}`}>
      <label className="font-medium text-sm flex items-center gap-x-2">
        <div className="label-content">
          <span>{label}</span>{" "}
          {helpText && (
            <>
              <div
                data-tip
                data-for={id}
                className="cursor-default inline-block"
              >
                <AiOutlineQuestionCircle size={10} />
              </div>

              <ReactTooltip
                id={id}
                place="right"
                type="dark"
                effect="solid"
                className="w-60"
              >
                <span>{helpText}</span>
              </ReactTooltip>
            </>
          )}
        </div>

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Toggle
              onBlur={onBlur}
              onChange={onChange}
              checked={value}
              ref={ref}
              disabled={disabled}
              className={`${classes}`}
              icons={showIcons}
            />
          )}
        />
      </label>
    </div>
  );
};

export default ToggleButton;
