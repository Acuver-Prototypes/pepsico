import React, { useState } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { DistributorForm, ShipToObj } from "../../types";
import Input from "../FormComponents/Input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiEdit, FiMinus } from "react-icons/fi";
import DistributorTabButtons from "../DistributorTabButtons.tsx/DistributorTabButtons";
import { FormattedMessage, useIntl } from "react-intl";
import type { DateObject, Value } from "react-multi-date-picker";
import DateSelector from "../FormComponents/DateSelector";
import DatePicker from "react-multi-date-picker";

interface Props {
  isValid: boolean;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  control: Control<DistributorForm, object>;
  showButtons?: boolean;
  disabled?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShipToForm = ({
  isValid,
  setCurrentTab,
  control,
  showButtons = true,
  disabled = false,
  setIsEditing,
}: Props) => {
  const [editing, setEditing] = useState<number | null>(null);

  const intl = useIntl();

  const schema = Yup.object({
    shipToDescription: Yup.string().required(
      intl.formatMessage({
        id: "shipToDescriptionIsRequired",
        defaultMessage: "Ship to description is required",
      })
    ),
    address1: Yup.string().required(
      intl.formatMessage({
        id: "address1IsRequired",
        defaultMessage: "Address 1 is required",
      })
    ),
    address2: Yup.string(),
    address3: Yup.string(),
    address4: Yup.string(),
    address5: Yup.string(),
    pinCode: Yup.string().required(
      intl.formatMessage({
        id: "pincodeIsRequired",
        defaultMessage: "Pincode is required",
      })
    ),
    contactPerson: Yup.string(),
    contactNo: Yup.string(),
    defaultWarehouse: Yup.string().required(
      intl.formatMessage({
        id: "defaultWarehouseIsRequired",
        defaultMessage: "Default warehouse is required",
      })
    ),
    holidays: Yup.array().of(Yup.date()),
  });

  const {
    register,
    reset,
    control: controlLocal,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<ShipToObj>({
    resolver: yupResolver(schema),
    defaultValues: {
      shipToDescription: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      address5: "",
      pinCode: "",
      contactPerson: "",
      contactNo: "",
      defaultWarehouse: "",
      holidays: [],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "shipTos",
  });

  const onSubmit = (data: ShipToObj) => {
    append(data);

    reset();
  };

  return (
    <div className="ship-to-form w-full">
      <div className="shipto-form w-full mb-12">
        <div className="form-components mb-8 grid grid-cols-4 gap-4">
          <Input
            label={intl.formatMessage({
              id: "shipToDescription",
              defaultMessage: "Ship to Description",
            })}
            id="shipToDescription"
            name="shipToDescription"
            error={errors?.shipToDescription?.message || null}
            register={register}
            placeholder=""
            required={true}
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "address1",
              defaultMessage: "Address 1",
            })}
            id="address1"
            name="address1"
            error={errors?.address1?.message || null}
            register={register}
            placeholder=""
            required={true}
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "address2",
              defaultMessage: "Address 2",
            })}
            id="address2"
            name="address2"
            error={errors?.address2?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "address3",
              defaultMessage: "Address 3",
            })}
            id="address3"
            name="address3"
            error={errors?.address3?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "address4",
              defaultMessage: "Address 4",
            })}
            id="address4"
            name="address4"
            error={errors?.address4?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "address5",
              defaultMessage: "Address 5",
            })}
            id="address5"
            name="address5"
            error={errors?.address5?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "pincode",
              defaultMessage: "Pincode",
            })}
            id="pinCode"
            name="pinCode"
            error={errors?.pinCode?.message || null}
            register={register}
            placeholder=""
            required={true}
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "contactPerson",
              defaultMessage: "Contact Person Name",
            })}
            id="contactPerson"
            name="contactPerson"
            error={errors?.contactPerson?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "contactNo",
              defaultMessage: "Contact No",
            })}
            id="contactNo"
            name="contactNo"
            error={errors?.contactNo?.message || null}
            register={register}
            placeholder=""
            disabled={disabled}
          />
          <Input
            label={intl.formatMessage({
              id: "defaultWarehouse",
              defaultMessage: "Default Warehouse",
            })}
            id="defaultWarehouse"
            name="defaultWarehouse"
            error={errors?.defaultWarehouse?.message || null}
            register={register}
            placeholder=""
            required={true}
            disabled={disabled}
          />
          <DateSelector
            label="Calendar"
            id="holidays"
            name="holidays"
            error={errors?.holidays?.message || null}
            control={controlLocal}
            placeholder=""
            isMulti={true}
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
                    shipToDescription: "",
                    address1: "",
                    address2: "",
                    address3: "",
                    address4: "",
                    address5: "",
                    pinCode: "",
                    contactPerson: "",
                    contactNo: "",
                    defaultWarehouse: "",
                    holidays: [],
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
                    shipToDescription: "",
                    address1: "",
                    address2: "",
                    address3: "",
                    address4: "",
                    address5: "",
                    pinCode: "",
                    contactPerson: "",
                    contactNo: "",
                    defaultWarehouse: "",
                    holidays: [],
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
              <FormattedMessage
                id="shipToDesc"
                defaultMessage={"Ship to Desc"}
              />
            </th>
            <th>
              <FormattedMessage id="address1" defaultMessage={"Address 1"} />
            </th>
            <th>
              <FormattedMessage id="address2" defaultMessage={"Address 2"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="address3" defaultMessage={"Address 3"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="address4" defaultMessage={"Address 4"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="address5" defaultMessage={"Address 5"} />
            </th>
            <th>
              {" "}
              <FormattedMessage id="pincode" defaultMessage={"Pincode"} />
            </th>
            <th>
              {" "}
              <FormattedMessage
                id="contactPerson"
                defaultMessage={"Contact Person Name"}
              />
            </th>
            <th>
              {" "}
              <FormattedMessage id="contactNo" defaultMessage={"Contact No"} />
            </th>

            <th>
              {" "}
              <FormattedMessage
                id="defaultWarehouse"
                defaultMessage={"Default Warehouse"}
              />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{item.shipToDescription}</td> <td>{item.address1}</td>
                <td>{item.address2}</td>
                <td>{item.address3}</td>
                <td>{item.address4}</td>
                <td>{item.address5}</td>
                <td>{item.pinCode}</td>
                <td>{item.contactPerson}</td>
                <td>{item.contactNo}</td>
                <td>{item.defaultWarehouse}</td>
                <td className="flex items-center gap-x-2">
                  <button
                    type="button"
                    className="btn btn-primary p-2"
                    onClick={() => {
                      setEditing(i);
                      reset(item);
                      setIsEditing && setIsEditing(true);
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
            onClick={() => setCurrentTab(0)}
            type="button"
            className="btn btn-gray"
          >
            <FormattedMessage id="back" defaultMessage={"Back"} />
          </button>
          <button
            type="button"
            disabled={!isValid}
            className="btn btn-primary"
            onClick={() => setCurrentTab(2)}
          >
            <FormattedMessage id="next" defaultMessage={"Next"} />
          </button>
        </DistributorTabButtons>
      )}
    </div>
  );
};

export default ShipToForm;
