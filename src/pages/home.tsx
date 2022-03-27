import { Heading, Container, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetQuestions } from '../features/questions/questionsSlice';

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <Container maxW='container.xl' d='flex' justifyContent={'center'} py='10'>
      <VStack spacing={{ base: '28', md: '52' }} textAlign='center'>
        <Heading size='lg'>Welcome to the Trivia Challenge!</Heading>
        <Heading size='lg'>
          You will be presented with 10 true or false questions.
        </Heading>
        <Heading size='lg'>Can you score 100%?</Heading>
        <Link to='/game'>
          <Button
            textTransform={'uppercase'}
            size='lg'
            px='10'
            colorScheme={'yellow'}
            onClick={() => dispatch(resetQuestions())}
          >
            Begin
          </Button>
        </Link>
      </VStack>
    </Container>
  );
}
