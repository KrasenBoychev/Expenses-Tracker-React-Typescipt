import React, { useEffect, useState } from "react";
import type { InitialValuesInterface } from "../interfaces/authentication";

export function useForm(initialValues: InitialValuesInterface, submitCallback: Function, setErrors: Function) {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const changeHandler = async (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      name: string,
      type: string,
      files: string[],
      value: string
    };

    setValues((state: InitialValuesInterface) => ({
      ...state,
      [target.name]:
        target.type === "file" ? target.files[0] : target.value,
    }));

    if (setErrors) {
      setErrors({});
    }
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    submitCallback(values);

    // setValues(initialValues);
  };

  return {
    values,
    changeHandler,
    submitHandler,
  };
}
