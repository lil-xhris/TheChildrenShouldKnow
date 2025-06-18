"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const riddles = [
  {
    question: "I am a tale of two cities, written by a man who loved Christmas. Who am I?",
    answer: "Charles Dickens",
    hint: "This author wrote 'A Christmas Carol'",
  },
  {
    question: "I wrote about a white whale and a captain's obsession. Who am I?",
    answer: "Herman Melville",
    hint: "The book is called 'Moby Dick'",
  },
  {
    question: "I am the bard of Avon, known for my plays and sonnets. Who am I?",
    answer: "William Shakespeare",
    hint: "To be or not to be, that is the question",
  },
]

export function DynamicRiddles() {
  const [currentRiddle, setCurrentRiddle] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const nextRiddle = () => {
    setCurrentRiddle((prev) => (prev + 1) % riddles.length)
    setShowAnswer(false)
    setShowHint(false)
  }

  const riddle = riddles[currentRiddle]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Literary Riddle #{currentRiddle + 1}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg text-center">{riddle.question}</p>

        {showHint && (
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Hint:</strong> {riddle.hint}
            </p>
          </div>
        )}

        {showAnswer && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-lg font-semibold text-green-800 text-center">Answer: {riddle.answer}</p>
          </div>
        )}

        <div className="flex justify-center space-x-2">
          {!showHint && !showAnswer && (
            <Button variant="outline" onClick={() => setShowHint(true)}>
              Show Hint
            </Button>
          )}
          {!showAnswer && <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>}
          {showAnswer && <Button onClick={nextRiddle}>Next Riddle</Button>}
        </div>
      </CardContent>
    </Card>
  )
}
