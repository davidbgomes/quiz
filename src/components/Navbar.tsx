import { SettingsIcon } from '@chakra-ui/icons';
import { Heading, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  return (
    <HStack justifyContent={'space-between'} px='10' py='5'>
      <Link to={'/'}>
        <Heading size='md'>Home</Heading>
      </Link>
      <Link to={'/settings'}>
        <SettingsIcon w='5' h='5' />
      </Link>
    </HStack>
  );
}
