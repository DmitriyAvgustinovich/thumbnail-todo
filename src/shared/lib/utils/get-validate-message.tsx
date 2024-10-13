import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { message } from "antd";

import {
  AND_VALIDATE_MESSAGE,
  DEFAULT_VALIDATE_MESSAGE,
} from "../../consts/general";

export const getValidateMessage = (error: ValidateErrorEntity) => {
  const notFilledFields = error.errorFields
    .map((errorField) => errorField.errors)
    .join(", ")
    .replace(new RegExp(DEFAULT_VALIDATE_MESSAGE, "g"), "")
    .replace(/,([^,]*)$/, ` ${AND_VALIDATE_MESSAGE}$1`);

  message.error(
    <>
      Fill in the required fields.
      <p>
        It remains to fill in - <b>{notFilledFields}</b>
      </p>
    </>
  );
};
