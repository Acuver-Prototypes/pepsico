import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DistributorForm, ShipToObj, TruckObj, VmiObj } from "../../types";
import Input from "../../components/FormComponents/Input";
import SubmitBtn from "../../components/FormComponents/SubmitBtn";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useToast from "../../hooks/useToast";
import GeneralForm from "../../components/DistributorForms/GeneralForm";
import ShipToForm from "../../components/DistributorForms/ShipToForm";
import TruckAssignmentForm from "../../components/DistributorForms/TruckAssignmentForm";
import VMIForm from "../../components/DistributorForms/VMIForm";
import { FormattedMessage, useIntl } from "react-intl";

const AddDistributor = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    formState: { errors, isValid },
  } = useForm<DistributorForm>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      code: "",
      name: "",
      shipToCode: "",
      customerName: "",
      priority: "",
      shelfLife: "",
      leadTime: "",
      targetDays: "",
      shipTos: [],
      trucks: [],
      vmis: [],
    },
  });

  const getCurrentContent = (currentTab: number) => {
    if (currentTab === 0) {
      return <GeneralForm {...{ errors, isValid, register, setCurrentTab }} />;
    } else if (currentTab === 1) {
      return <ShipToForm {...{ control, isValid, setCurrentTab }} />;
    } else if (currentTab === 2) {
      return (
        <TruckAssignmentForm
          {...{ control, isValid, setCurrentTab, isSubmitting }}
        />
      );
    } else if (currentTab === 3) {
      return <VMIForm {...{ control, isValid, setCurrentTab, isSubmitting }} />;
    }
  };

  const onSubmit = (data: DistributorForm) => {
    console.log(data);

    navigate("/distributors");

    showSuccess(
      intl.formatMessage({
        id: "distributorHasBeenAdded",
        defaultMessage: "Distributor has been added",
      })
    );
  };

  return (
    <div className="add-distributor page">
      <div className="header bg-white h-14 shadow rounded p-2 flex items-center justify-between mb-6 sticky top-14 z-10">
        <div className="left flex items-center gap-x-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} className="text-primary" />
          </button>
          <h1 className="text-base font-bold">
            <FormattedMessage
              id="addDistributor"
              defaultMessage={"Add Distributor"}
            />
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form w-full">
        <div
          className="tabs sticky top-28 bg-white h-12 border-b text-sm mb-6 shadow flex justify-between"
          style={{
            zIndex: 8,
          }}
        >
          <div className="left">
            <button
              disabled={true}
              // onClick={() => setCurrentTab(0)}
              type="button"
              role="tab"
              className={`${
                currentTab === 0
                  ? "active border-b-2 border-primary text-primary"
                  : "text-gray-500"
              } h-12 font-semibold px-3 cursor-default`}
            >
              <FormattedMessage id="general" defaultMessage={"General"} />
            </button>
            <button
              disabled={true}
              // onClick={() => setCurrentTab(1)}
              type="button"
              role="tab"
              className={`${
                currentTab === 1
                  ? "active border-b-2 border-primary text-primary"
                  : "text-gray-500"
              } h-12 font-semibold px-3 cursor-default`}
            >
              <FormattedMessage id="shipTo" defaultMessage={"Ship To"} />
            </button>
            <button
              disabled={true}
              type="button"
              role="tab"
              // onClick={() => setCurrentTab(2)}
              className={`${
                currentTab === 2
                  ? "active border-b-2 border-primary text-primary"
                  : "text-gray-500"
              } h-12 font-semibold px-3 cursor-default`}
            >
              <FormattedMessage
                id="truckAssignment"
                defaultMessage={"Truck Assignment"}
              />
            </button>
            <button
              disabled={true}
              type="button"
              // onClick={() => setCurrentTab(3)}
              role="tab"
              className={`${
                currentTab === 3
                  ? "active border-b-2 border-primary text-primary"
                  : "text-gray-500"
              } h-12 font-semibold px-3 cursor-default`}
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

        {/* <div className="form-buttons w-full flex justify-center items-center">
          <SubmitBtn
            classes="h-11"
            translateId="addDistributor"
            disabled={Object.keys(errors).length > 0}
            isSubmitting={isSubmitting}
            text={"Add Distributor"}
          />
        </div> */}
      </form>
    </div>
  );
};

export default AddDistributor;
