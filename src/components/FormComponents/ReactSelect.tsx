import React from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import ReactTooltip from "react-tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Controller } from "react-hook-form";
import { OptionObj } from "../../types";
import Select from "react-select";

interface Props {
  label: string;
  id: string;
  name: string;
  options: OptionObj[];
  control: any;
  placeholder?: string;
  error: string | null;
  classes?: string;
  outerClasses?: string;
  required?: boolean;
  helpText?: string;
  disabled?: boolean;
  isMulti?: boolean;
}

const ReactSelect = ({
  label,
  id,
  name,
  options,
  control,
  placeholder,
  error,
  required,
  classes,
  outerClasses,
  helpText,
  disabled = false,
  isMulti = false,
}: Props) => {
  return (
    <div className={`input flex flex-col ${outerClasses}`}>
      <label className="font-medium mb-1.5 text-sm" htmlFor={id}>
        {required && <span className="text-red-500 mr-1">*</span>}
        <span>{label}</span>{" "}
        {helpText && (
          <>
            <div data-tip data-for={id} className="cursor-default inline-block">
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
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            isMulti={isMulti}
            {...field}
            id={id}
            options={options}
            isDisabled={disabled}
            placeholder={placeholder}
            className={`${classes} text-sm`}
          />
        )}
      />

      {error && <ErrorBox text={error} />}
    </div>
  );
};

export default ReactSelect;
