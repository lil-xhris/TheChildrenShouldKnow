"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type RiddleOrFact = {
  question: string
  answer: string
  type: "riddle" | "fact"
}

const riddlesAndFacts: RiddleOrFact[] = [
  {
    question: "I wrote 'Romeo and Juliet'. Who am I?",
    answer: "William Shakespeare",
    type: "riddle",
  },
  {
    question: "The average pencil can write how many words?",
    answer: "About 45,000 words",
    type: "fact",
  },
  {
    question: "I'm the author of 'Pride and Prejudice'. Who am I?",
    answer: "Jane Austen",
    type: "riddle",
  },
  {
    question: "The world's longest novel contains over 1.2 million words. What is it?",
    answer: "Artamène ou le Grand Cyrus",
    type: "fact",
  },
  {
    question: "I wrote 'Things Fall Apart'. Who am I?",
    answer: "Chinua Achebe",
    type: "riddle",
  },
  {
    question: "What is the most translated book after the Bible?",
    answer: "The Little Prince by Antoine de Saint-Exupéry",
    type: "fact",
  },
  {
    question: "I created the detective Sherlock Holmes. Who am I?",
    answer: "Arthur Conan Doyle",
    type: "riddle",
  },
  {
    question: "What was the first book ever printed?",
    answer: "The Gutenberg Bible",
    type: "fact",
  },
  {
    question: "I wrote 'One Hundred Years of Solitude'. Who am I?",
    answer: "Gabriel García Márquez",
    type: "riddle",
  },
  {
    question: "How many words did Shakespeare add to the English language?",
    answer: "About 1,700 words",
    type: "fact",
  },
  {
    question: "I wrote 'The Great Gatsby'. Who am I?",
    answer: "F. Scott Fitzgerald",
    type: "riddle",
  },
  {
    question: "What is the oldest known form of poetry?",
    answer: "Epic Poetry (like the Epic of Gilgamesh)",
    type: "fact",
  },
  {
    question: "I wrote 'To Kill a Mockingbird'. Who am I?",
    answer: "Harper Lee",
    type: "riddle",
  },
  {
    question: "What is the most expensive book ever sold?",
    answer: "Leonardo da Vinci's Codex Leicester ($30.8 million)",
    type: "fact",
  },
  {
    question: "I wrote '1984'. Who am I?",
    answer: "George Orwell",
    type: "riddle",
  },
  {
    question: "What is the shortest poem in the world?",
    answer: "'Fleas' by Ogden Nash: 'Adam Had'em'",
    type: "fact",
  },
  {
    question: "I wrote 'War and Peace'. Who am I?",
    answer: "Leo Tolstoy",
    type: "riddle",
  },
  {
    question: "How many books are published worldwide each year?",
    answer: "About 2 million books",
    type: "fact",
  },
  {
    question: "I wrote 'The Color Purple'. Who am I?",
    answer: "Alice Walker",
    type: "riddle",
  },
  {
    question: "What percentage of published books never sell more than 100 copies?",
    answer: "About 90%",
    type: "fact",
  },
  {
    question: "I wrote 'The Catcher in the Rye'. Who am I?",
    answer: "J.D. Salinger",
    type: "riddle",
  },
  {
    question: "What is the most common word in English literature?",
    answer: "The word 'the'",
    type: "fact",
  },
  {
    question: "I wrote 'Beloved'. Who am I?",
    answer: "Toni Morrison",
    type: "riddle",
  },
  {
    question: "How many words are in the complete works of Shakespeare?",
    answer: "About 884,000 words",
    type: "fact",
  },
  {
    question: "I wrote 'The Lord of the Rings'. Who am I?",
    answer: "J.R.R. Tolkien",
    type: "riddle",
  },
  {
    question: "What is the longest English word?",
    answer: "Pneumonoultramicroscopicsilicovolcanoconiosis (45 letters)",
    type: "fact",
  },
  {
    question: "I wrote 'The Handmaid's Tale'. Who am I?",
    answer: "Margaret Atwood",
    type: "riddle",
  },
  {
    question: "What is the most widely published book in history?",
    answer: "The Bible",
    type: "fact",
  },
  {
    question: "I wrote 'Don Quixote'. Who am I?",
    answer: "Miguel de Cervantes",
    type: "riddle",
  },
  {
    question: "How many words does the average person know?",
    answer: "Between 20,000 and 35,000 words",
    type: "fact",
  },
  {
    question: "I wrote 'Moby-Dick'. Who am I?",
    answer: "Herman Melville",
    type: "riddle",
  },
  {
    question: "What is the oldest continuously published newspaper?",
    answer: "Wiener Zeitung (since 1703)",
    type: "fact",
  },
  {
    question: "I wrote 'The Odyssey'. Who am I?",
    answer: "Homer",
    type: "riddle",
  },
  {
    question: "How many letters are in the Hawaiian alphabet?",
    answer: "12 letters",
    type: "fact",
  },
  {
    question: "I wrote 'Frankenstein'. Who am I?",
    answer: "Mary Shelley",
    type: "riddle",
  },
  {
    question: "What is the most translated document in the world?",
    answer: "The Universal Declaration of Human Rights",
    type: "fact",
  },
  {
    question: "I wrote 'The Divine Comedy'. Who am I?",
    answer: "Dante Alighieri",
    type: "riddle",
  },
  {
    question: "What is the world's most stolen book?",
    answer: "The Bible",
    type: "fact",
  },
  {
    question: "I wrote 'Crime and Punishment'. Who am I?",
    answer: "Fyodor Dostoevsky",
    type: "riddle",
  },
  {
    question: "What is the average reading speed for adults?",
    answer: "200-250 words per minute",
    type: "fact",
  },
]

export function DynamicRiddles() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [usedIndices, setUsedIndices] = useState<number[]>([])

  const getNextIndex = () => {
    const currentType = riddlesAndFacts[currentIndex]?.type
    const nextType = currentType === "riddle" ? "fact" : "riddle"

    const availableIndices = riddlesAndFacts
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => !usedIndices.includes(index) && item.type === nextType)
      .map(({ index }) => index)

    if (availableIndices.length === 0) {
      setUsedIndices([]) // Reset when all items of the needed type have been shown
      return riddlesAndFacts.findIndex((item) => item.type === nextType)
    }

    return availableIndices[Math.floor(Math.random() * availableIndices.length)]
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = getNextIndex()
      setCurrentIndex(nextIndex)
      setUsedIndices((prev) => [...prev, nextIndex])
      setShowAnswer(false)
    }, 7000)

    return () => clearInterval(timer)
  }, [currentIndex, usedIndices])

  const current = riddlesAndFacts[currentIndex]

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg inline-block w-full max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-bold mb-2 text-lg">{current.type === "riddle" ? "Literary Quiz!" : "Writing Fact!"}</h3>
          <p className="mb-4 text-gray-800">{current.question}</p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="text-sm text-purple-600 hover:text-purple-800 transition-colors duration-300 font-medium"
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {showAnswer && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 text-sm text-gray-600 font-medium"
        >
          {current.answer}
        </motion.p>
      )}
    </div>
  )
}
