import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DistributorForm, ShipToObj, TruckObj, VmiObj } from "../../types";
import Input from "../../components/FormComponents/Input";
import SubmitBtn from "../../components/FormComponents/SubmitBtn";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { FormattedMessage, useIntl } from "react-intl";
import GeneralForm from "../../components/DistributorForms/GeneralForm";
import ShipToForm from "../../components/DistributorForms/ShipToForm";
import TruckAssignmentForm from "../../components/DistributorForms/TruckAssignmentForm";
import VMIForm from "../../components/DistributorForms/VMIForm";
import { DateObject } from "react-multi-date-picker";

const DistributorDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state }: any = useLocation();
  const [isEditing, setIsEditing] = useState(state?.edit ? true : false);

  const { showSuccess } = useToast();

  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);

  const intl = useIntl();

  const schema = Yup.object({
    code: Yup.string().required(
      intl.formatMessage({
        id: "distributorCodeIsRequired",
        defaultMessage: "Distributor Code is required",
      })
    ),
    name: Yup.string().required(
      intl.formatMessage({
        id: "distributorNameIsRequired",
        defaultMessage: "Distributor Name is required",
      })
    ),
    shipToCode: Yup.string(),
    customerName: Yup.string(),
    priority: Yup.string(),
    shelfLife: Yup.string(),
    leadTime: Yup.string(),
    targetDays: Yup.string(),

    shipTos: Yup.array<ShipToObj>().of(
      Yup.object({
        shipToDescription: Yup.string(),
        address1: Yup.string(),
        address2: Yup.string(),
        address3: Yup.string(),
        address4: Yup.string(),
        address5: Yup.string(),
        pinCode: Yup.string(),
        contactPerson: Yup.string(),
        contactNo: Yup.string(),
        defaultWarehouse: Yup.string(),
        holidays: Yup.array().of(Yup.date()),
      })
    ),
    trucks: Yup.array<TruckObj>().of(
      Yup.object({
        truckType: Yup.string(),
        truckDescription: Yup.string(),
        truckTypeDescription: Yup.string(),
        volumeContainer: Yup.string(),
        palletsPerTruck: Yup.string(),
        weightContainer: Yup.string(),
        palletUpperLimit: Yup.string(),
        palletLowerLimit: Yup.string(),
      })
    ),
    vmis: Yup.array<VmiObj>().of(
      Yup.object({
        productCode: Yup.string(),
        productDescription: Yup.string(),
        safetyStock: Yup.string(),
        uom: Yup.string(),
        ads: Yup.string(),
        skuType: Yup.string(),
        seasonalityFactor: Yup.string(),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<DistributorForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "201",
      name: "ABC",
      shipToCode: "150433935",
      customerName: "PATCHARA DM CO LTD",
      priority: "5",
      shelfLife: "60",
      leadTime: "5",
      targetDays: "2",
      shipTos: [
        {
          shipToDescription: "PATCHARA DM CO LTD",
          address1: "111 หมู่ 5",
          address2: "",
          address3: "ต.โคกขาม",
          address4: "อ.เมืองสมุทรสาคร",
          address5: "จ.สมุทรสาคร",
          pinCode: "74000",
          contactPerson: "NOPPADOL EIMONGARD",
          contactNo: "915783092",
          defaultWarehouse: "Main Warehouse",
          holidays: [new Date()],
        },
      ],
      trucks: [
        {
          truckType: "10W13P",
          truckDescription: "10WHEEL-13PALLET",
          truckTypeDescription: "10WHEEL-13PALLET",
          volumeContainer: "15000",
          palletsPerTruck: "13",
          weightContainer: "15000",
          palletUpperLimit: "13.33",
          palletLowerLimit: "12",
        },
      ],
      vmis: [
        {
          productCode: "320022712",
          productDescription: "",
          safetyStock: "8",
          uom: "CT",
          ads: "48",
          skuType: "L",
          seasonalityFactor: "1.00",
        },
      ],
    },
  });

  const onSubmit = (data: DistributorForm) => {
    console.log(data);

    navigate("/distributors");

    showSuccess(
      intl.formatMessage({
        id: "detailsHasBeenUpdated",
        defaultMessage: "Details has been updated",
      })
    );
  };

  const getCurrentContent = (currentTab: number) => {
    if (currentTab === 0) {
      return (
        <GeneralForm
          {...{
            errors,
            isValid,
            register,
            setCurrentTab,
            disabled: !isEditing,
            showButtons: false,
          }}
        />
      );
    } else if (currentTab === 1) {
      return (
        <ShipToForm
          {...{
            control,
            isValid,
            setCurrentTab,
            disabled: !isEditing,
            showButtons: false,
            setIsEditing
          }}
        />
      );
    } else if (currentTab === 2) {
      return (
        <TruckAssignmentForm
          {...{
            control,
            isValid,
            setCurrentTab,
            isSubmitting,
            disabled: !isEditing,
            showButtons: false,
            setIsEditing
          }}
        />
      );
    } else if (currentTab === 3) {
      return (
        <VMIForm
          {...{
            control,
            isValid,
            setCurrentTab,
            isSubmitting,
            disabled: !isEditing,
            showButtons: false,
            setIsEditing
          }}
        />
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="distributor-details page"
    >
      <div className="header bg-white h-14 shadow rounded p-2 flex items-center justify-between mb-6 sticky top-14 z-10">
        <div className="left flex items-center gap-x-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} className="text-primary" />
          </button>
          <h1 className="text-base font-bold">
            <FormattedMessage
              id="distributorDetail"
              defaultMessage={"Distributor Detail"}
            />
          </h1>
        </div>

        {isEditing ? (
          <div className="flex items-center gap-x-2">
            <button
              className="btn btn-gray"
              onClick={() => {
                reset();
                setIsEditing(false);
                setCurrentTab(0);
              }}
            >
              <FormattedMessage id="cancel" defaultMessage={"Cancel"} />
            </button>
            <SubmitBtn
              translateId="update"
              classes="w-28"
              disabled={Object.keys(errors).length > 0 || !isDirty}
              isSubmitting={isSubmitting}
              text={"Update"}
            />
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <FormattedMessage id="edit" defaultMessage={"Edit"} />
          </button>
        )}
      </div>

      <div
        className="tabs sticky top-28 bg-white h-12 border-b text-sm mb-6 shadow flex justify-between"
        style={{
          zIndex: 8,
        }}
      >
        <div className="left">
          <button
            onClick={() => setCurrentTab(0)}
            type="button"
            role="tab"
            className={`${
              currentTab === 0
                ? "active border-b-2 border-primary text-primary"
                : "text-gray-500"
            } h-12 font-semibold px-3 cursor-pointer disabled:cursor-default`}
          >
            <FormattedMessage id="general" defaultMessage={"General"} />
          </button>
          <button
            onClick={() => setCurrentTab(1)}
            type="button"
            role="tab"
            className={`${
              currentTab === 1
                ? "active border-b-2 border-primary text-primary"
                : "text-gray-500"
            } h-12 font-semibold px-3 cursor-pointer disabled:cursor-default`}
          >
            <FormattedMessage id="shipTo" defaultMessage={"Ship To"} />
          </button>
          <button
            type="button"
            role="tab"
            onClick={() => setCurrentTab(2)}
            className={`${
              currentTab === 2
                ? "active border-b-2 border-primary text-primary"
                : "text-gray-500"
            } h-12 font-semibold px-3 cursor-pointer disabled:cursor-default`}
          >
            <FormattedMessage
              id="truckAssignment"
              defaultMessage={"Truck Assignment"}
            />
          </button>
          <button
            type="button"
            onClick={() => setCurrentTab(3)}
            role="tab"
            className={`${
              currentTab === 3
                ? "active border-b-2 border-primary text-primary"
                : "text-gray-500"
            } h-12 font-semibold px-3 cursor-pointer disabled:cursor-default`}
          >
            <FormattedMessage id="vmiFactor" defaultMessage={"VMI Factor"} />
          </button>
        </div>

        <div
          id="distributor-tab-portal"
          className="flex items-center gap-x-2 mr-2"
        ></div>
      </div>

      {getCurrentContent(currentTab)}
    </form>
  );
};

export default DistributorDetails;
