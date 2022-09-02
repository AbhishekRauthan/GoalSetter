import { Box } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { PrimaryBtn } from '../components/Button';
import { CenterCon, FormCon } from '../components/Container';
import { PrimaryHeading, SecondaryHeading } from '../components/Heading';
import { Input, PasswordInput } from '../components/Input';

const Register = () => {
  return (
    <>
      <CenterCon>
        <Box>
          <PrimaryHeading icon={FaUser}>Register</PrimaryHeading>
          <SecondaryHeading>Please create an account</SecondaryHeading>
        </Box>
        <FormCon>
          <Input type="name">Name</Input>
          <Input type="email">Email</Input>
          <PasswordInput>password</PasswordInput>
          <PasswordInput>confirm password</PasswordInput>
          <PrimaryBtn>Register</PrimaryBtn>
        </FormCon>
      </CenterCon>
    </>
  );
};

export default Register;
