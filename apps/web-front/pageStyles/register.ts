import { theme } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const FormLabel = styled('label')`
  z-index: -1;
  position: absolute;
  left: 0;
  text-transform: capitalize;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  font-size: 0.75rem;
  top: -12px;
  color: ${theme.colors.black};
  .peer:placeholder-shown ~ & {
    color: ${theme.colors.blackAlpha[500]};
    font-size: 1rem;
    top: 4px;
  }
`;
