import React from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import ReactTooltip from "react-tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface Props {
  label: string;
  id: string;
  name: string;
  register: any;
  placeholder?: string;
  error: string | null;
  classes?: string;
  required?: boolean;
  helpText?: string;
  disabled?: boolean;
  outerClasses?: string;
}

const TextArea = ({
  label,
  id,
  name,
  register,
  placeholder,
  error,
  required,
  classes,
  outerClasses,
  helpText,
  disabled = false,
}: Props) => {
  return (
    <div className={`text-area flex flex-col  ${outerClasses}`}>
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

      <textarea
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        {...register(name)}
        className={`bg-white px-4 py-4 resize-none rounded border outline-none disabled:bg-gray-300 disabled:cursor-not-allowed ${classes} mb-2 text-sm`}
        style={{
          minHeight: "150px",
        }}
      ></textarea>

      {error && <ErrorBox text={error} />}
    </div>
  );
};

export default TextArea;
