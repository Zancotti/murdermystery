import React from 'react';
import styled from 'styled-components/macro';

export const InputFinalReport = ({
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
  padding: 9px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  &::placeholder {
    font-size: 16px;
  }

  @media (max-width: 535px) {
    width: 100%;
    margin: 0px;
  }
  @media (min-width: 536px) and (max-width: 1024px) {
    width: 100%;
  }
`;
