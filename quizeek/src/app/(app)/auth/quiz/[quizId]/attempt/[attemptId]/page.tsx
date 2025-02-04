import { QuizAttempt } from '@/components/quiz/quiz-attempt';
import {
  getQuizAttemptById,
  getQuizWithPublicQuestionsById,
} from '@/db/queries';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

type AttemptPageProps = {
  params?: Promise<{
    quizId?: string;
    attemptId?: string;
  }>;
};

export const metadata = {
  title: 'Take Quiz',
};

const Page = async ({ params }: AttemptPageProps) => {
  const routeParams = await params;

  if (!routeParams?.quizId || !routeParams.attemptId) {
    notFound();
  }

  const quiz = await getQuizWithPublicQuestionsById(routeParams.quizId);
  const attempt = await getQuizAttemptById(routeParams.attemptId);

  if (!quiz || !attempt) {
    return notFound();
  }

  if (attempt.score !== null) {
    // attempt already submitted
    redirect(`/auth/quiz/${quiz.id}/view/${attempt.id}`);
  }

  return (
    <>
      <h1 className="text-xl font-bold">{quiz.title}</h1>
      <QuizAttempt quiz={quiz} attempt={attempt} />
    </>
  );
};

export default Page;
