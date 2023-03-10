import React from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFormRegister,
} from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { DistributorForm } from "../../types";
import DistributorTabButtons from "../DistributorTabButtons.tsx/DistributorTabButtons";
import Input from "../FormComponents/Input";

interface Props {
  errors: FieldErrorsImpl<DeepRequired<DistributorForm>>;
  register: UseFormRegister<DistributorForm>;
  isValid: boolean;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  showButtons?: boolean;
  disabled?: boolean;
}

const GeneralForm = ({
  errors,
  register,
  isValid,
  setCurrentTab,
  disabled = false,
  showButtons = true,
}: Props) => {
  const intl = useIntl();

  return (
    <div className="general-form w-full">
      <div className="form-components mb-8 grid grid-cols-3 gap-4">
        <Input
          label={intl.formatMessage({
            id: "distributorCodeFull",
            defaultMessage: "Distributor Code",
          })}
          id="code"
          name="code"
          error={errors?.code?.message || null}
          register={register}
          placeholder=""
          required={true}
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "distributorName",
            defaultMessage: "Distributor Name",
          })}
          id="name"
          name="name"
          error={errors?.name?.message || null}
          register={register}
          placeholder=""
          required={true}
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "shipToCodeFull",
            defaultMessage: "Ship To Code",
          })}
          id="shipToCode"
          name="shipToCode"
          error={errors?.shipToCode?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "customerName",
            defaultMessage: "Customer Name",
          })}
          id="customerName"
          name="customerName"
          error={errors?.customerName?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "priority",
            defaultMessage: "Priority",
          })}
          id="priority"
          name="priority"
          error={errors?.priority?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "shelfLife",
            defaultMessage: "Shelf Life",
          })}
          id="shelfLife"
          name="shelfLife"
          error={errors?.shelfLife?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "leadTime",
            defaultMessage: "Lead Time",
          })}
          id="leadTime"
          name="leadTime"
          error={errors?.leadTime?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
        <Input
          label={intl.formatMessage({
            id: "targetDays",
            defaultMessage: "Target Days",
          })}
          id="targetDays"
          name="targetDays"
          error={errors?.targetDays?.message || null}
          register={register}
          placeholder=""
          disabled={disabled}
        />
      </div>

      {showButtons && (
        <DistributorTabButtons>
          <button
            disabled={!isValid}
            className="btn btn-primary"
            onClick={() => setCurrentTab(1)}
          >
            <FormattedMessage id="next" defaultMessage={"Next"} />
          </button>
        </DistributorTabButtons>
      )}
    </div>
  );
};

export default GeneralForm;
