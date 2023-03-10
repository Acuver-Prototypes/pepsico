import React, { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { DistributorForm, ProductMappingForm } from "../../types";
import Input from "../../components/FormComponents/Input";
import SubmitBtn from "../../components/FormComponents/SubmitBtn";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useToast from "../../hooks/useToast";
import ToggleButton from "../../components/FormComponents/ToggleButton";
import { FormattedMessage, useIntl } from "react-intl";

const AddProductMapping = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showSuccess } = useToast();

  const navigate = useNavigate();

  const intl = useIntl();

  const schema = Yup.object({
    distCode: Yup.string().required(
      intl.formatMessage({
        id: "distributorCodeIsRequired",
        defaultMessage: "Distributor Code is required",
      })
    ),
    shipToCode: Yup.string().required(
      intl.formatMessage({
        id: "shipToCodeIsRequired",
        defaultMessage: "Ship To Code is required",
      })
    ),
    prdCode: Yup.string().required(
      intl.formatMessage({
        id: "productCodeIsRequired",
        defaultMessage: "Product Code is required",
      })
    ),
    prdCodeOld1: Yup.string(),
    prdCodeOld2: Yup.string(),
    prdCodeOld3: Yup.string(),
    prdCodeOld4: Yup.string(),
    prdCodeOld5: Yup.string(),
    active: Yup.boolean(),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<ProductMappingForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      distCode: "",
      shipToCode: "",
      prdCode: "",
      prdCodeOld1: "",
      prdCodeOld2: "",
      prdCodeOld3: "",
      prdCodeOld4: "",
      prdCodeOld5: "",
      active: false,
    },
  });

  const onSubmit = (data: ProductMappingForm) => {
    console.log(data);

    navigate("/product-mapping");

    showSuccess(
      intl.formatMessage({
        id: "productMappingHasBeenAdded",
        defaultMessage: "Product Mapping has been added",
      })
    );
  };

  return (
    <div className="product-mapping page">
      <div className="header bg-white h-14 shadow rounded p-2 flex items-center justify-between mb-6 sticky top-14">
        <div className="left flex items-center gap-x-3">
          <button type="button" onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} className="text-primary" />
          </button>
          <h1 className="text-base font-bold">
            <FormattedMessage
              id="productMapping"
              defaultMessage={"Product Mapping"}
            />
          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form w-full">
        <div className="form-components mb-8 grid grid-cols-2 gap-4">
          <Input
            label={intl.formatMessage({
              id: "distributorCodeFull",
              defaultMessage: "Distributor Code",
            })}
            id="distCode"
            name="distCode"
            error={errors?.distCode?.message || null}
            register={register}
            placeholder=""
            required={true}
          />
          <Input
            label={intl.formatMessage({
              id: "shipToCodeFull",
              defaultMessage: "Ship to Code",
            })}
            id="shipToCode"
            name="shipToCode"
            error={errors?.shipToCode?.message || null}
            register={register}
            placeholder=""
            required={true}
          />
          <Input
            label={intl.formatMessage({
              id: "productCodeFull",
              defaultMessage: "Product Code",
            })}
            id="prdCode"
            name="prdCode"
            error={errors?.prdCode?.message || null}
            register={register}
            placeholder=""
            required={true}
          />
          <Input
            label={intl.formatMessage({
              id: "productCodeOld1Full",
              defaultMessage: "Product Code Old 1",
            })}
            id="prdCodeOld1"
            name="prdCodeOld1"
            error={errors?.prdCodeOld1?.message || null}
            register={register}
            placeholder=""
          />
          <Input
            label={intl.formatMessage({
              id: "productCodeOld2Full",
              defaultMessage: "Product Code Old 2",
            })}
            id="prdCodeOld2"
            name="prdCodeOld2"
            error={errors?.prdCodeOld2?.message || null}
            register={register}
            placeholder=""
          />
          <Input
            label={intl.formatMessage({
              id: "productCodeOld3Full",
              defaultMessage: "Product Code Old 3",
            })}
            id="prdCodeOld3"
            name="prdCodeOld3"
            error={errors?.prdCodeOld3?.message || null}
            register={register}
            placeholder=""
          />
          <Input
            label={intl.formatMessage({
              id: "productCodeOld4Full",
              defaultMessage: "Product Code Old 4",
            })}
            id="prdCodeOld4"
            name="prdCodeOld4"
            error={errors?.prdCodeOld4?.message || null}
            register={register}
            placeholder=""
          />
          <Input
            label={intl.formatMessage({
              id: "productCodeOld5Full",
              defaultMessage: "Product Code Old 5",
            })}
            id="prdCodeOld5"
            name="prdCodeOld5"
            error={errors?.prdCodeOld5?.message || null}
            register={register}
            placeholder=""
          />
          <ToggleButton
            label={intl.formatMessage({
              id: "active",
              defaultMessage: "Active",
            })}
            id="active"
            name="active"
            control={control}
          />
        </div>

        <div className="form-buttons w-full flex justify-center items-center">
          <SubmitBtn
            classes="h-11"
            translateId="addDistributor"
            disabled={Object.keys(errors).length > 0}
            isSubmitting={isSubmitting}
            text={"Add Distributor"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProductMapping;
