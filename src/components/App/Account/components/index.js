import styled from "styled-components";

export const TitleIcon = styled.div`
  width: 34px;
  height: 24px;
  mask: url(${({ src }) => src}) no-repeat left center;
  mask-size: 24px 24px;
  background-color: ${({ theme }) => {
    return theme.customProfileBackground100 ? theme.secondary : theme.primary;
  }};
  float: left;
`;
