import React from 'react';
import styled from 'styledComponents';

export const Input = ({
  onChange,
  placeholder,
  type,
  required,
  minLength,
  value,
}) => {
  return (
    <InputType
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      minLength={minLength}
      value={value}
    ></InputType>
  );
};

const InputType = styled.input`
  margin: 10px 0px;
  padding: 5px;
`;
