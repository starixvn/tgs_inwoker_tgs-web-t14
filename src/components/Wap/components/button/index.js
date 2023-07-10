import React from "react";
import styled from "styled-components";

const Content = styled.div`
  ${(props) =>
    props.disabled
      ? `background-color: #A5A5A5;`
      : `background-color: ${props.theme.primary};
         filter: drop-shadow(0 0 5px ${props.theme.primary})
      drop-shadow(0 0 5px ${props.theme.primary}) contrast(1)
      brightness(1);`}
  height: 105px;
  border-radius: 50px;

  width: 100%;
  font-size: 34px;
  color: ${({ theme }) =>
    theme.customButtonText ? theme.customButtonText : "#ffffff"};
  text-align: center;

  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
  min-width: ${({ minWidth }) => {
    return minWidth ? minWidth : " fit-content";
  }};
`;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  width: 100%;
`;

const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;

  margin: 10px auto;
  flex: auto;
  width: fit-content;

  align-items: center;
  justify-content: center;
`;

const Button = (props) => {
  return (
    <CustomInput style={props.style}>
      <SelectContainer>
        <Content
          minWidth={props.minWidth}
          onClick={props.disabled === true ? null : props.onClick}
          disabled={props.disabled ? props.disabled : false}
        >
          {props.label}
        </Content>
      </SelectContainer>
    </CustomInput>
  );
};

export default Button;
