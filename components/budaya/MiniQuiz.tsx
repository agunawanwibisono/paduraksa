'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import type { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';

export function MiniQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[step];

  // Handle empty or invalid quiz data
  if (!question) {
    if (finished) {
      return null;
    }

    return (
      <div className="rounded-xl2 border border-subtle bg-surface p-6 text-center shadow-soft dark:shadow-soft-dark">
        <p className="text-secondary">Belum ada pertanyaan kuis.</p>
      </div>
    );
  }

  function handleSelect(index: number) {
    if (selected !== null) return;

    const currentQuestion = questions[step];

    if (!currentQuestion) return;

    setSelected(index);

    if (index === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (step + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setStep((s) => s + 1);
    setSelected(null);
  }

  function handleRestart() {
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="rounded-xl2 border border-subtle bg-surface p-8 text-center shadow-soft dark:shadow-soft-dark">
        <h3 className="font-display text-xl font-bold">
          Kuis Selesai!
        </h3>

        <p className="mt-2 text-secondary">
          Skormu:{' '}
          <span className="font-semibold text-lamongan-700 dark:text-lamongan-300">
            {score}
          </span>{' '}
          dari {questions.length}
        </p>

        <Button
          onClick={handleRestart}
          className="mt-5"
          variant="outline"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Ulangi Kuis
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-subtle bg-surface p-6 shadow-soft dark:shadow-soft-dark sm:p-8">
      <ProgressBar
        value={(step / questions.length) * 100}
        label={`Pertanyaan ${step + 1} dari ${questions.length}`}
        className="mb-6"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="mb-5 font-display text-lg font-semibold">
            {question.question}
          </h3>

          <div className="space-y-2.5">
            {question.options.map((option, i) => {
              const isCorrect = i === question.correctIndex;
              const isSelected = i === selected;
              const showResult = selected !== null;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',

                    !showResult &&
                      'border-subtle hover:border-lamongan-400 hover:bg-lamongan-50 dark:hover:bg-lamongan-900/30',

                    showResult &&
                      isCorrect &&
                      'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',

                    showResult &&
                      isSelected &&
                      !isCorrect &&
                      'border-red-500 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',

                    showResult &&
                      !isSelected &&
                      !isCorrect &&
                      'border-subtle opacity-50'
                  )}
                >
                  {option}

                  {showResult && isCorrect && (
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      aria-hidden
                    />
                  )}

                  {showResult && isSelected && !isCorrect && (
                    <XCircle
                      className="h-4 w-4 shrink-0"
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl bg-lamongan-50 p-4 text-sm text-secondary dark:bg-lamongan-950/30"
            >
              {question.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {selected !== null && (
        <Button
          onClick={handleNext}
          className="mt-5 w-full sm:w-auto"
        >
          {step + 1 >= questions.length
            ? 'Lihat Hasil'
            : 'Pertanyaan Berikutnya'}
        </Button>
      )}
    </div>
  );
} 