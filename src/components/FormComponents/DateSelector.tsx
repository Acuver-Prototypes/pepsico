import React, { useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import ReactTooltip from "react-tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Controller } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import type { Value } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css";
import Icon from "react-multi-date-picker/components/icon"

interface Props {
  label: string;
  id: string;
  name: string;
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

const DateSelector = ({
  control,
  error,
  id,
  label,
  name,
  classes,
  disabled,
  helpText,
  isMulti,
  outerClasses,
  placeholder,
  required,
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

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              style={{
                height: "37px",
                borderRadius: "5px",
                fontSize: "14px",
                padding: "3px 10px",
                borderColor: "lightgray",
              }}
              render={<Icon />}
              value={value || ""}
              onChange={(date: DateObject[]) => {
                onChange(date ? date.map((d) => d.toDate()) : "");
              }}
              multiple={isMulti}
              disabled={disabled}
              className={`${classes} text-sm p-2 red`}
              placeholder={placeholder}
            />
          );
        }}
      />

      {error && <ErrorBox text={error} />}
    </div>
  );
};

export default DateSelector;
