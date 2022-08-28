import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { FormLabel } from 'apps/web-front/globalStyles';
import { forwardRef, ReactNode, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  children: ReactNode;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, children, ...rest }, ref) => (
    <InputGroup position="relative" transform="scale(1.23)">
      <ChakraInput
        _placeholder={{ opacity: 0 }}
        placeholder="Name"
        type={type}
        variant="flushed"
        size="sm"
        focusBorderColor="black"
        className="peer"
        ref={ref}
        {...rest}
      />
      <FormLabel>{children}</FormLabel>
    </InputGroup>
  )
);

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...rest }, ref) => {
    const [showPass, setShowPass] = useState(false);
    return (
      <InputGroup position="relative" transform="scale(1.23)">
        <ChakraInput
          _placeholder={{ opacity: 0 }}
          type={showPass ? 'text' : 'password'}
          placeholder="Name"
          variant="flushed"
          focusBorderColor="black"
          className="peer"
          ref={ref}
          {...rest}
        />
        <FormLabel>{children}</FormLabel>
        <InputRightElement
          onClick={() => setShowPass(!showPass)}
          children={<Icon as={showPass ? FiEye : FiEyeOff} color="black" />}
        />
      </InputGroup>
    );
  }
);
