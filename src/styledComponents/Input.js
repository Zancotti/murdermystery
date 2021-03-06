import React from 'react';
import styled from 'styled-components/macro';

export const Input = ({
  onChange,
  placeholder,
  type,
  required,
  minLength,
  value,
  disabled,
}) => {
  return (
    <InputType
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      minLength={minLength}
      value={value}
      disabled={disabled}
    ></InputType>
  );
};

const InputType = styled.input`
  margin: 10px 0px;
  padding: 5px;
  width: 100%;
`;
