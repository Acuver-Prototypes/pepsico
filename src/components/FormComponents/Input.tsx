import React from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import ReactTooltip from "react-tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface Props {
  label?: string;
  id: string;
  name: string;
  register: any;
  type?: "text" | "number" | "email" | "password" | "date";
  placeholder?: string;
  error: string | null;
  classes?: string;
  required?: boolean;
  helpText?: string;
  minLength?: number;
  disabled?: boolean;
  outerClasses?: string;
}

const Input = ({
  label,
  id,
  name,
  outerClasses,
  minLength,
  register,
  type = "text",
  placeholder,
  error,
  required,
  classes,
  helpText,
  disabled = false,
}: Props) => {
  return (
    <div className={`input flex flex-col  ${outerClasses}`}>
      {label && (
        <label className="font-medium mb-1.5 text-sm" htmlFor={id}>
          {required && <span className="text-red-500 mr-1">*</span>}
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
        </label>
      )}
      <input
        disabled={disabled}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        minLength={type === "number" ? minLength : null}
        className={`bg-white px-4 py-2 rounded border outline-none disabled:bg-gray-200 disabled:cursor-not-allowed ${classes} mb-1 text-sm`}
      />

      {error && <ErrorBox text={error} />}
    </div>
  );
};

export default Input;
