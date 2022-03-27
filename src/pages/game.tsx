import {
  Heading,
  Container,
  VStack,
  Spinner,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { shuffle } from '../utils/helpers';
import AnswerButton from '../components/AnswerButton';
import { decode } from 'html-entities';
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { saveQuestions } from '../features/questions/questionsSlice';

export type ResultType = {
  category: string;
  type: 'boolean' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type DataType = {
  response_code: number;
  results: ResultType[];
};

const AnswerOptions = (result: ResultType) => {
  return shuffle([result.correct_answer, ...result.incorrect_answers]);
};

export default function Game(): JSX.Element {
  const dispatch = useDispatch();
  const { currentQuestion } = useSelector(
    (state: RootState) => state.questions
  );
  const { type, difficulty, questionsAmount } = useSelector(
    (state: RootState) => state.settings
  );

  const {
    isLoading,
    error,
    data,
  }: { isLoading: boolean; error: unknown; data: DataType | undefined } =
    useQuery(
      'questions',
      () =>
        fetch(
          `https://opentdb.com/api.php?amount=${questionsAmount}&difficulty=${difficulty}&type=${type}`
        )
          .then(res => res.json())
          .catch(err => {
            throw new Error(err);
          }),
      {
        refetchOnWindowFocus: false,
      }
    );

  if (isLoading || !data || error) {
    return (
      <Box d='flex' h='100vh' alignItems={'center'} justifyContent={'center'}>
        <Spinner />
      </Box>
    );
  }

  const { results } = data;
  dispatch(saveQuestions(results));

  return (
    <Container maxW='container.xl' d='flex' justifyContent={'center'} pb='10'>
      <VStack
        spacing={{ base: '20', md: '48' }}
        justifyContent={'space-between'}
        textAlign='center'
        w='full'
      >
        <Heading textDecoration={'underline'}>
          {decode(results[currentQuestion - 1].category)}
        </Heading>
        <VStack w='full'>
          <Box
            borderRadius={'lg'}
            borderWidth='thin'
            bgColor={'gray.200'}
            py='10'
            px='3'
          >
            <Heading size='lg' wordBreak={'break-word'}>
              {decode(results[currentQuestion - 1].question)}
            </Heading>
          </Box>
          <Heading
            fontWeight={'bold'}
            size='md'
          >{`${currentQuestion} of ${questionsAmount}`}</Heading>
        </VStack>
        <SimpleGrid columns={2} gap={10} w='full' justifyItems={'center'}>
          {type === 'boolean' ? (
            <>
              <AnswerButton label='False' colorScheme='red' />
              <AnswerButton label='True' colorScheme='green' />
            </>
          ) : (
            AnswerOptions(results[currentQuestion - 1]).map(el => {
              return <AnswerButton key={el} label={decode(el)} />;
            })
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
