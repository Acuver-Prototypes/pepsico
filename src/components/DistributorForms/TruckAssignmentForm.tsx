import React, { useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { DistributorForm, TruckObj } from "../../types";
import Input from "../FormComponents/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiEdit, FiMinus } from "react-icons/fi";
import DistributorTabButtons from "../DistributorTabButtons.tsx/DistributorTabButtons";
import { FormattedMessage, useIntl } from "react-intl";

interface Props {
  isValid: boolean;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  control: Control<DistributorForm, object>;
  showButtons?: boolean;
  disabled?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TruckAssignmentForm = ({
  isValid,
  setCurrentTab,
  control,
  showButtons = true,
  disabled = false,
  setIsEditing
}: Props) => {
  const [editing, setEditing] = useState<number | null>(null);

  const intl = useIntl();

  const schema = Yup.object({
    truckType: Yup.string().required(
      intl.formatMessage({
        id: "truckTypeIsRequired",
        defaultMessage: "Truck type is required",
      })
    ),
    truckDescription: Yup.string(),
    truckTypeDescription: Yup.string(),
    volumeContainer: Yup.string(),
    palletsPerTruck: Yup.string(),
    weightContainer: Yup.string(),
    palletUpperLimit: Yup.string(),
    palletLowerLimit: Yup.string(),
  });

  const {
    register,
    reset,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<TruckObj>({
    resolver: yupResolver(schema),
    defaultValues: {
      truckType: "",
      truckDescription: "",
      truckTypeDescription: "",
      volumeContainer: "",
      palletsPerTruck: "",
      weightContainer: "",
      palletUpperLimit: "",
      palletLowerLimit: "",
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "trucks",
  });

  const onSubmit = (data: TruckObj) => {
    append(data);

    reset();
  };

  return (
    <div className="truck-assignment-form w-full">
      <div className="truck-assignment-form w-full mb-12">
        <div className="form-components mb-8 grid grid-cols-4 gap-4">
          <Input
            label={intl.formatMessage({
              id: "truckType",
              defaultMessage: "Truck type",
            })}
            id="truckType"
            name="truckType"
            error={errors?.truckType?.message || null}
            register={register}
            placeholder=""
            required={true}
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "truckDescription",
              defaultMessage: "Truck Description",
            })}
            id="truckDescription"
            name="truckDescription"
            error={errors?.truckDescription?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "truckTypeDescription",
              defaultMessage: "Truck type Description",
            })}
            id="truckTypeDescription"
            name="truckTypeDescription"
            error={errors?.truckTypeDescription?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "volumeContainer",
              defaultMessage: "Volume Container",
            })}
            id="volumeContainer"
            name="volumeContainer"
            error={errors?.volumeContainer?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "palletsPerTruck",
              defaultMessage: "Pallets per Truck",
            })}
            id="palletsPerTruck"
            name="palletsPerTruck"
            error={errors?.palletsPerTruck?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "weightContainer",
              defaultMessage: "Weight Container",
            })}
            id="weightContainer"
            name="weightContainer"
            error={errors?.weightContainer?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "palletUpperLimit",
              defaultMessage: "Pallet Upper Limit",
            })}
            id="palletUpperLimit"
            name="palletUpperLimit"
            error={errors?.palletUpperLimit?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "palletLowerLimit",
              defaultMessage: "Pallet Lower Limit",
            })}
            id="palletLowerLimit"
            name="palletLowerLimit"
            error={errors?.palletLowerLimit?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
        </div>

        <div className="form-buttons flex items-center justify-center">
          {editing !== null ? (
            <div className="btns flex items-center gap-x-4">
              <button
                type="button"
                className="btn btn-gray w-44"
                onClick={() => {
                  setEditing(null);
                  reset({
                    truckType: "",
                    truckDescription: "",
                    truckTypeDescription: "",
                    volumeContainer: "",
                    palletsPerTruck: "",
                    weightContainer: "",
                    palletUpperLimit: "",
                    palletLowerLimit: "",
                  });
                }}
              >
                <FormattedMessage id="cancel" defaultMessage={"Cancel"} />
              </button>
              <button
                type="button"
                className="btn btn-primary w-44 h-10"
                disabled={Object.keys(errors).length > 0}
                onClick={() => {
                  update(editing, getValues());
                  setEditing(null);
                  reset({
                    truckType: "",
                    truckDescription: "",
                    truckTypeDescription: "",
                    volumeContainer: "",
                    palletsPerTruck: "",
                    weightContainer: "",
                    palletUpperLimit: "",
                    palletLowerLimit: "",
                  });
                }}
              >
                <FormattedMessage id="save" defaultMessage={"Save"} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary w-44 h-10"
              disabled={Object.keys(errors).length > 0}
              onClick={() => handleSubmit(onSubmit)()}
            >
              <FormattedMessage id="add" defaultMessage={"Add"} />
            </button>
          )}
        </div>
      </div>

      <table className="table mb-12">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="truckType" defaultMessage={"Truck type"} />
            </th>
            <th>
              <FormattedMessage id="truckDesc" defaultMessage={"Truck Desc"} />
            </th>
            <th>
              <FormattedMessage
                id="truckTypeDesc"
                defaultMessage={"Truck type Desc"}
              />
            </th>
            <th>
              {" "}
              <FormattedMessage
                id="volumeContainer"
                defaultMessage={"Volume Container"}
              />
            </th>
            <th>
              <FormattedMessage
                id="palletsPerTruck"
                defaultMessage={"Pallets per Truck"}
              />
            </th>
            <th>
              {" "}
              <FormattedMessage
                id="weightContainer"
                defaultMessage={"Weight Container"}
              />
            </th>
            <th>
              {" "}
              <FormattedMessage
                id="palletUpperLimit"
                defaultMessage={"Pallet Upper Limit"}
              />
            </th>
            <th>
              {" "}
              <FormattedMessage
                id="palletLowerLimit"
                defaultMessage={"Pallet Lower Limit"}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{item.truckType}</td> <td>{item.truckDescription}</td>
                <td>{item.truckTypeDescription}</td>
                <td>{item.volumeContainer}</td>
                <td>{item.palletsPerTruck}</td>
                <td>{item.weightContainer}</td>
                <td>{item.palletUpperLimit}</td>
                <td>{item.palletLowerLimit}</td>
                <td className="flex items-center gap-x-2">
                  <button
                    type="button"
                    className="btn btn-primary p-2"
                    onClick={() => {
                      setEditing(i);
                      reset(item);
                      setIsEditing && setIsEditing(true)
                    }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="btn bg-red-400 p-2"
                    type="button"
                    onClick={() => remove(i)}
                  >
                    <FiMinus />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showButtons && (
        <DistributorTabButtons>
          <button
            onClick={() => setCurrentTab(1)}
            type="button"
            className="btn btn-gray"
          >
            <FormattedMessage id="back" defaultMessage={"Back"} />
          </button>
          <button
            type="button"
            disabled={!isValid}
            className="btn btn-primary"
            onClick={() => setCurrentTab(3)}
          >
            <FormattedMessage id="next" defaultMessage={"Next"} />
          </button>
        </DistributorTabButtons>
      )}
    </div>
  );
};

export default TruckAssignmentForm;
