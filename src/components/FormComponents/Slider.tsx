import React from "react";
import ReactTooltip from "react-tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Controller } from "react-hook-form";
import ReactInputSlider from "react-input-slider";
import { FormattedMessage } from "react-intl";

interface Props {
  label: string;
  id: string;
  name: string;
  axis: "x" | "y" | "xy";
  control: any;
  translateId: string;
  helpTranslateId?: string;
  xmin: number;
  xmax: number;
  xstep: number;
  outerClasses?: string;
  helpText?: string;
  disabled?: boolean;
}

const Slider = ({
  label,
  id,
  name,
  control,
  xmin,
  xmax,
  translateId,
  helpTranslateId,
  xstep,
  axis,
  outerClasses,
  helpText,
  disabled = false,
}: Props) => {
  return (
    <div className={`toggle-button flex items-center gap-x-4 ${outerClasses}`}>
      <label className="font-medium text-sm flex items-center gap-x-4">
        <div className="label-content">
          <span>
            {<FormattedMessage id={translateId} defaultMessage={label} />}
          </span>{" "}
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
                <span>
                  {
                    <FormattedMessage
                      id={helpTranslateId}
                      defaultMessage={helpText}
                    />
                  }
                </span>
              </ReactTooltip>
            </>
          )}
        </div>
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className="flex items-center gap-x-1">
            <span>{xmin}</span>
            <ReactInputSlider
              onChange={({ x }) => onChange(x)}
              disabled={disabled}
              axis={axis}
              x={value}
              xmax={xmax}
              xmin={xmin}
              xstep={xstep}
            />
            <span>{xmax}</span>

            <span className="font-semibold inline-block ml-4">{value}%</span>
          </div>
        )}
      />
    </div>
  );
};

export default Slider;
