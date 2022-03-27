import { Button, Text } from '@chakra-ui/react';
import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementCurrentQuestion,
  saveAnswer,
} from '../features/questions/questionsSlice';
import { useNavigate } from 'react-router-dom';

type PropsType = {
  label: string;
  [rest: string]: string;
};

export default function AnswerButton({
  label,
  ...rest
}: PropsType): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionsAmount = useSelector(
    (state: RootState) => state.settings.questionsAmount
  );
  const currentQuestion = useSelector(
    (state: RootState) => state.questions.currentQuestion
  );

  const submitAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const answer = e.currentTarget.value;
    dispatch(saveAnswer(answer));
    dispatch(incrementCurrentQuestion());
    if (currentQuestion === questionsAmount) {
      navigate('/scoreboard');
    }
  };

  return (
    <Button
      value={label}
      onClick={e => submitAnswer(e)}
      minH={'32'}
      colorScheme='cyan'
      w='full'
      {...rest}
    >
      <Text fontSize={{ base: 'md', md: 'xl' }} whiteSpace={'pre-wrap'}>
        {label}
      </Text>
    </Button>
  );
}
