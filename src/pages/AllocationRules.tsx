import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SubmitBtn from "../components/FormComponents/SubmitBtn";
import Slider from "../components/FormComponents/Slider";
import { useState } from "react";
import { useDailyAllocation } from "../contexts/DailyAllocationContext";
import useToast from "../hooks/useToast";
import { useIntl } from "react-intl";
import ToggleButton from "../components/FormComponents/ToggleButton";

interface FormInputs {
  priority: number;
  ytdSales: number;
  forecast: number;
  allocateOrder: boolean;
}

const schema = Yup.object({
  priority: Yup.number(),
  ytdSales: Yup.number(),
  forecast: Yup.number(),
  allocateOrder: Yup.boolean(),
});

const AllocationRules = () => {
  const { setDailyAllocation } = useDailyAllocation();

  const { showSuccess } = useToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      priority: 30,
      ytdSales: 40,
      forecast: 70,
      allocateOrder: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const intl = useIntl();

  const onSubmit = (data: FormInputs) => {
    setIsSubmitting(true);

    const delta = (data.priority + data.forecast + data.ytdSales) / 100;

    // update dailyAllocation state value
    setDailyAllocation((prevValue) => {
      return prevValue.map((value) => ({
        ...value,
        allocationQuantity: Math.floor(value.allocationQuantity * delta),
      }));
    });

    showSuccess(
      intl.formatMessage({
        id: "rulesHasBeenUpdatedSuccessfully",
        defaultMessage: "Rules has been updated successfully.",
      })
    );

    // reset form
    reset(data);

    setIsSubmitting(false);
  };

  return (
    <div className="allocation-rules page mt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="form max-w-3xl">
        <div className="form-components mb-12 flex flex-col gap-y-8">
          <Slider
            translateId="allocationRules.priority"
            id="priority"
            name="priority"
            control={control}
            label="Priority"
            xmin={0}
            axis="x"
            xmax={100}
            xstep={1}
          />
          <Slider
            translateId="allocationRules.ytdSales"
            id="ytdSales"
            name="ytdSales"
            control={control}
            label="YTD Sales"
            xmin={0}
            axis="x"
            xmax={100}
            xstep={1}
          />
          <Slider
            translateId="allocationRules.forecast"
            id="forecast"
            name="forecast"
            control={control}
            label="Forecast"
            xmin={0}
            axis="x"
            xmax={100}
            xstep={1}
          />
          <ToggleButton
            id="allocateOrder"
            control={control}
            label="Allocate Order"
            name="allocateOrder"
          />
        </div>

        <div className="form-buttons w-full flex justify-center items-center">
          <SubmitBtn
            translateId="save"
            disabled={Object.keys(errors).length > 0 || !isDirty}
            isSubmitting={isSubmitting}
            text={"Save"}
          />
        </div>
      </form>
    </div>
  );
};

export default AllocationRules;
