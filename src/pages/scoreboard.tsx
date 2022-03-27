import { useState, useEffect } from 'react';
import { Heading, Container, VStack, HStack, Button } from '@chakra-ui/react';
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { decode } from 'html-entities';
import { resetQuestions } from '../features/questions/questionsSlice';
import { useNavigate } from 'react-router-dom';

export default function Scoreboard(): JSX.Element {
  const [correctAnswers, setCorrectAnswers] = useState<number>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, answers } = useSelector(
    (state: RootState) => state.questions
  );
  const { questionsAmount } = useSelector((state: RootState) => state.settings);

  const setNewGame = () => {
    dispatch(resetQuestions());
    navigate('/game');
  };

  useEffect(() => {
    let correctAnswers = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i].correct_answer) {
        correctAnswers += 1;
      }
    }
    setCorrectAnswers(correctAnswers);
  }, [questions]);

  return (
    <Container maxW='container.xl' d='flex' my='10'>
      <VStack
        spacing={{ base: '5', md: '20' }}
        justifyContent={'space-between'}
      >
        <VStack justifyContent={'center'}>
          <Heading textDecoration={'underline'}>You Scored</Heading>
          <Heading size='md'>
            {correctAnswers} of {questionsAmount}
          </Heading>
        </VStack>
        <VStack alignItems={'flex-start'} spacing='5'>
          {questions.map(({ question, correct_answer }, i) => {
            return (
              <HStack key={i}>
                {answers[i] === correct_answer ? (
                  <CheckIcon color='green' />
                ) : (
                  <CloseIcon color='red' />
                )}
                <Heading
                  fontSize={{ base: 'lg', md: '2xl' }}
                  wordBreak={'break-word'}
                >
                  {decode(question)}
                </Heading>
              </HStack>
            );
          })}
        </VStack>
        <Button textTransform={'uppercase'} px='10' py='4' onClick={setNewGame}>
          Play Again
        </Button>
      </VStack>
    </Container>
  );
}
