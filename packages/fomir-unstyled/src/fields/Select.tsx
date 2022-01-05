import React from "react";
import { FieldRegisterProps } from "fomir-react";
import { Box } from "@fower/react";

export const Select = (props: FieldRegisterProps) => {
  const { label, error, disabled, touched, options, register } = props;
  console.log("options:", options, disabled);
  return (
    <Box>
      {label && <Box>{label}</Box>}
      <select disabled={disabled} {...register}>
        {options.map((item, i) => (
          <option key={i + item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {error && touched && <Box red50>{error}</Box>}
    </Box>
  );
};
