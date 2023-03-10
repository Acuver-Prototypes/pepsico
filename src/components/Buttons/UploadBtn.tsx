import React from "react";
import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi";
import { useIntl } from "react-intl";
import useToast from "../../hooks/useToast";
import UtilityBtn from "../UtilityBtn/UtilityBtn";

const UploadBtn = () => {
  const { showSuccess } = useToast();

  const intl = useIntl();

  return (
    <UtilityBtn
      Icon={FiUploadCloud}
      label={intl.formatMessage({
        id: "uploadCSV",
        defaultMessage: "Upload CSV",
      })}
      uniqueId="uploadBtn"
      classes="btn btn-primary-outline gap-x-0"
      onClick={() =>
        showSuccess(
          intl.formatMessage({
            id: "uploadedSuccessfully",
            defaultMessage: "Uploaded successfully",
          })
        )
      }
    />
  );
};

export default UploadBtn;
