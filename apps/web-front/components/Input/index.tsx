import {
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { FormLabel } from './styles';
import { forwardRef, ReactNode, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  children: ReactNode;
  type?: string;
}

const InputWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <InputGroup
      position="relative"
      w={{ base: '80vw', md: '50vw', lg: 'max-content' }}
      transform={{ base: 'none', lg: 'scale(1.23)' }}
    >
      {children}
    </InputGroup>
  );
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, children, ...rest }, ref) => (
    <InputWrapper>
      <ChakraInput
        _placeholder={{ opacity: 0 }}
        placeholder="Name"
        type={type}
        variant="flushed"
        focusBorderColor="black"
        className="peer"
        _focusVisible={{
          boxShadow: 'none',
          borderColor: '#000',
        }}
        ref={ref}
        {...rest}
      />
      <FormLabel>{children}</FormLabel>
    </InputWrapper>
  )
);
Input.displayName = 'Input';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...rest }, ref) => {
    const [showPass, setShowPass] = useState(false);
    return (
      <InputWrapper>
        <ChakraInput
          _placeholder={{ opacity: 0 }}
          type={showPass ? 'text' : 'password'}
          placeholder="Name"
          variant="flushed"
          focusBorderColor="black"
          size="sm"
          className="peer"
          _focusVisible={{
            boxShadow: 'none',
            borderColor: '#000',
          }}
          ref={ref}
          {...rest}
        />
        <FormLabel>{children}</FormLabel>
        <InputRightElement onClick={() => setShowPass(!showPass)}>
          <Icon as={showPass ? FiEye : FiEyeOff} color="black" />
        </InputRightElement>
      </InputWrapper>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
