export interface WriterData {
  id: string
  name: string
  birthDate: string
  deathDate?: string
  nationality: string
  genre: string[]
  majorWorks: string[]
  awards: string[]
  bio: string
  image: string
  isReligious: boolean
  era: string
  quote: string
  lesson: string
  weekNumber: number
}

export const WRITERS_DATABASE: WriterData[] = [
  // Week 1
  {
    id: "writer_001",
    name: "William Shakespeare",
    birthDate: "1564-04-26",
    deathDate: "1616-04-23",
    nationality: "English",
    genre: ["Drama", "Poetry", "Tragedy", "Comedy"],
    majorWorks: ["Hamlet", "Romeo and Juliet", "Macbeth", "Othello", "King Lear", "A Midsummer Night's Dream"],
    awards: ["Considered greatest writer in English language"],
    bio: "William Shakespeare was an English poet, playwright, and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
    isReligious: false,
    era: "Renaissance (1564-1616)",
    quote: "All the world's a stage, and all the men and women merely players.",
    lesson:
      "Shakespeare teaches us about the complexity of human nature and the timeless themes of love, ambition, jealousy, and power.",
    weekNumber: 1,
  },
  // Week 2
  {
    id: "writer_002",
    name: "Dante Alighieri",
    birthDate: "1265-05-01",
    deathDate: "1321-09-14",
    nationality: "Italian",
    genre: ["Epic Poetry", "Religious Literature"],
    majorWorks: ["The Divine Comedy", "Inferno", "Purgatorio", "Paradiso"],
    awards: ["Father of the Italian language"],
    bio: "Dante Alighieri was an Italian poet, writer and philosopher. His Divine Comedy is widely considered one of the greatest works of world literature.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Dante_Alighieri.jpg",
    isReligious: true,
    era: "Medieval (1265-1321)",
    quote: "The path to paradise begins in hell.",
    lesson:
      "Dante shows us the journey of spiritual transformation and the power of divine love to overcome all obstacles.",
    weekNumber: 2,
  },
  // Week 3
  {
    id: "writer_003",
    name: "Jane Austen",
    birthDate: "1775-12-16",
    deathDate: "1817-07-18",
    nationality: "English",
    genre: ["Romance", "Social Commentary", "Novel"],
    majorWorks: ["Pride and Prejudice", "Sense and Sensibility", "Emma", "Persuasion"],
    awards: ["Pioneer of the novel of manners"],
    bio: "Jane Austen was an English novelist known for her wit, social observation and insight into the lives of women in Georgian England.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg",
    isReligious: false,
    era: "Regency (1775-1817)",
    quote: "It isn't what we say or think that defines us, but what we do.",
    lesson:
      "Austen teaches us about social dynamics, the importance of character over wealth, and the power of wit and intelligence.",
    weekNumber: 3,
  },
  // Week 4
  {
    id: "writer_004",
    name: "Rumi (Jalal ad-Din Muhammad Rumi)",
    birthDate: "1207-09-30",
    deathDate: "1273-12-17",
    nationality: "Persian",
    genre: ["Mystical Poetry", "Sufi Literature", "Religious Poetry"],
    majorWorks: ["Masnavi", "Divan-e Shams-e Tabrizi", "Fihi Ma Fihi"],
    awards: ["Most widely read poet in the United States"],
    bio: "Rumi was a 13th-century Persian poet, Islamic scholar, theologian, and Sufi mystic whose poems have been widely translated into many languages.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Rumi.jpg",
    isReligious: true,
    era: "Medieval Islamic Golden Age (1207-1273)",
    quote: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
    lesson: "Rumi teaches us about divine love, spiritual transformation, and the unity of all existence.",
    weekNumber: 4,
  },
  // Week 5
  {
    id: "writer_005",
    name: "Leo Tolstoy",
    birthDate: "1828-09-09",
    deathDate: "1910-11-20",
    nationality: "Russian",
    genre: ["Novel", "Philosophy", "Religious Literature"],
    majorWorks: ["War and Peace", "Anna Karenina", "The Death of Ivan Ilyich"],
    awards: ["Nominated for Nobel Prize in Literature multiple times"],
    bio: "Leo Tolstoy was a Russian writer who is regarded as one of the greatest authors of all time, known for his novels and moral philosophy.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg",
    isReligious: true,
    era: "19th Century Russian (1828-1910)",
    quote: "Everyone thinks of changing the world, but no one thinks of changing himself.",
    lesson:
      "Tolstoy teaches us about moral responsibility, the search for meaning, and the importance of spiritual growth.",
    weekNumber: 5,
  },
  // Week 6
  {
    id: "writer_006",
    name: "Maya Angelou",
    birthDate: "1928-04-04",
    deathDate: "2014-05-28",
    nationality: "American",
    genre: ["Autobiography", "Poetry", "Civil Rights Literature"],
    majorWorks: ["I Know Why the Caged Bird Sings", "On the Pulse of Morning", "Phenomenal Woman"],
    awards: ["Presidential Medal of Freedom", "Over 50 honorary degrees"],
    bio: "Maya Angelou was an American poet, memoirist, and civil rights activist known for her series of seven autobiographies.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Maya_Angelou_visits_YCP_College_%28cropped%29.jpg",
    isReligious: true,
    era: "20th Century American (1928-2014)",
    quote: "There is no greater agony than bearing an untold story inside you.",
    lesson: "Angelou teaches us about resilience, the power of storytelling, and overcoming adversity with grace.",
    weekNumber: 6,
  },
  // Week 7
  {
    id: "writer_007",
    name: "Gabriel García Márquez",
    birthDate: "1927-03-06",
    deathDate: "2014-04-17",
    nationality: "Colombian",
    genre: ["Magical Realism", "Novel", "Short Story"],
    majorWorks: ["One Hundred Years of Solitude", "Love in the Time of Cholera", "Chronicle of a Death Foretold"],
    awards: ["Nobel Prize in Literature (1982)"],
    bio: "Gabriel García Márquez was a Colombian novelist, short-story writer, screenwriter, and journalist, known for popularizing magical realism.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg",
    isReligious: false,
    era: "20th Century Latin American (1927-2014)",
    quote:
      "It is not true that people stop pursuing dreams because they grow old, they grow old because they stop pursuing dreams.",
    lesson:
      "Márquez teaches us about the magic in everyday life and the cyclical nature of history and human experience.",
    weekNumber: 7,
  },
  // Week 8
  {
    id: "writer_008",
    name: "Toni Morrison",
    birthDate: "1931-02-18",
    deathDate: "2019-08-05",
    nationality: "American",
    genre: ["Novel", "African American Literature", "Historical Fiction"],
    majorWorks: ["Beloved", "Song of Solomon", "The Bluest Eye", "Jazz"],
    awards: ["Nobel Prize in Literature (1993)", "Pulitzer Prize for Fiction (1988)"],
    bio: "Toni Morrison was an American novelist, essayist, book editor, and college professor whose novels are known for their epic themes and vivid dialogue.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Toni_Morrison_2008.jpg",
    isReligious: false,
    era: "20th-21st Century American (1931-2019)",
    quote: "If you want to fly, you have to give up the things that weigh you down.",
    lesson:
      "Morrison teaches us about the African American experience, the power of memory, and the importance of confronting historical trauma.",
    weekNumber: 8,
  },
  // Week 9
  {
    id: "writer_009",
    name: "Chinua Achebe",
    birthDate: "1930-11-16",
    deathDate: "2013-03-21",
    nationality: "Nigerian",
    genre: ["Postcolonial Literature", "Novel", "Essay"],
    majorWorks: ["Things Fall Apart", "No Longer at Ease", "Arrow of God"],
    awards: ["Man Booker International Prize (2007)"],
    bio: "Chinua Achebe was a Nigerian novelist, poet, professor, and critic who is regarded as the dominant figure of modern African literature.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Chinua_Achebe_-_Buffalo_25Sep2008.jpg",
    isReligious: false,
    era: "20th-21st Century African (1930-2013)",
    quote: "Until the lions have their own historians, the history of the hunt will always glorify the hunter.",
    lesson:
      "Achebe teaches us about the impact of colonialism and the importance of telling our own stories from our own perspective.",
    weekNumber: 9,
  },
  // Week 10
  {
    id: "writer_010",
    name: "Rabindranath Tagore",
    birthDate: "1861-05-07",
    deathDate: "1941-08-07",
    nationality: "Indian (Bengali)",
    genre: ["Poetry", "Novel", "Drama", "Philosophy"],
    majorWorks: ["Gitanjali", "The Home and the World", "Gora"],
    awards: ["Nobel Prize in Literature (1913) - First non-European to win"],
    bio: "Rabindranath Tagore was a Bengali polymath who reshaped Bengali literature and music as well as Indian art with Contextual Modernism.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Rabindranath_Tagore_in_1909.jpg",
    isReligious: true,
    era: "19th-20th Century Indian Renaissance (1861-1941)",
    quote: "Don't limit a child to your own learning, for they were born in another time.",
    lesson:
      "Tagore teaches us about universal humanism, the synthesis of Eastern and Western thought, and the power of education.",
    weekNumber: 10,
  },
  // Week 11
  {
    id: "writer_011",
    name: "Virginia Woolf",
    birthDate: "1882-01-25",
    deathDate: "1941-03-28",
    nationality: "English",
    genre: ["Modernist Literature", "Stream of Consciousness", "Feminist Literature"],
    majorWorks: ["Mrs. Dalloway", "To the Lighthouse", "Orlando", "A Room of One's Own"],
    awards: ["Pioneering modernist writer"],
    bio: "Virginia Woolf was an English writer, considered one of the most important modernist 20th-century authors and a pioneer in the use of stream of consciousness.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902.jpg",
    isReligious: false,
    era: "Modernist (1882-1941)",
    quote: "For most of history, Anonymous was a woman.",
    lesson:
      "Woolf teaches us about the inner life of consciousness, women's rights, and the experimental possibilities of literature.",
    weekNumber: 11,
  },
  // Week 12
  {
    id: "writer_012",
    name: "Jorge Luis Borges",
    birthDate: "1899-08-24",
    deathDate: "1986-06-14",
    nationality: "Argentine",
    genre: ["Short Story", "Poetry", "Essay", "Magical Realism"],
    majorWorks: ["Labyrinths", "Ficciones", "The Aleph"],
    awards: ["International Publishers' Prize (1961)"],
    bio: "Jorge Luis Borges was an Argentine short-story writer, essayist, poet and translator, regarded as a key figure in Spanish-language literature.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Jorge_Luis_Borges_1951.jpg",
    isReligious: false,
    era: "20th Century Latin American (1899-1986)",
    quote: "I have always imagined that Paradise will be a kind of library.",
    lesson:
      "Borges teaches us about the infinite possibilities of literature, the nature of reality, and the power of imagination.",
    weekNumber: 12,
  },
  // Week 13
  {
    id: "writer_013",
    name: "Fyodor Dostoevsky",
    birthDate: "1821-11-11",
    deathDate: "1881-02-09",
    nationality: "Russian",
    genre: ["Psychological Fiction", "Philosophical Novel", "Crime Fiction"],
    majorWorks: ["Crime and Punishment", "The Brothers Karamazov", "Notes from Underground"],
    awards: ["Considered one of the greatest psychologists in world literature"],
    bio: "Fyodor Dostoevsky was a Russian novelist, philosopher, short story writer, essayist, and journalist.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dostoevsky_1872.jpg",
    isReligious: true,
    era: "19th Century Russian (1821-1881)",
    quote: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    lesson:
      "Dostoevsky teaches us about the depths of human psychology, moral responsibility, and spiritual redemption.",
    weekNumber: 13,
  },
  // Week 14
  {
    id: "writer_014",
    name: "Emily Dickinson",
    birthDate: "1830-12-10",
    deathDate: "1886-05-15",
    nationality: "American",
    genre: ["Poetry", "Lyric Poetry"],
    majorWorks: ["Because I could not stop for Death", "I'm Nobody! Who are you?", "Hope is the thing with feathers"],
    awards: ["Posthumously recognized as one of America's greatest poets"],
    bio: "Emily Dickinson was an American poet known for her unique style and reclusive life, now considered one of the most important figures in American poetry.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Emily_Dickinson_daguerreotype.jpg",
    isReligious: true,
    era: "19th Century American (1830-1886)",
    quote: "I dwell in possibility.",
    lesson:
      "Dickinson teaches us about the power of solitude, the beauty of nature, and the exploration of death and immortality.",
    weekNumber: 14,
  },
  // Week 15
  {
    id: "writer_015",
    name: "James Baldwin",
    birthDate: "1924-08-02",
    deathDate: "1987-12-01",
    nationality: "American",
    genre: ["Essay", "Novel", "Social Commentary", "Civil Rights Literature"],
    majorWorks: ["Go Tell It on the Mountain", "Notes of a Native Son", "The Fire Next Time"],
    awards: ["Legion of Honor from France"],
    bio: "James Baldwin was an American novelist, essayist, playwright, poet, and social critic known for his essays on the black experience in America.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/37/James_Baldwin_33_Allan_Warren.jpg",
    isReligious: true,
    era: "20th Century American (1924-1987)",
    quote: "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
    lesson:
      "Baldwin teaches us about racial justice, the complexity of identity, and the power of love to overcome hatred.",
    weekNumber: 15,
  },
  // Week 16
  {
    id: "writer_016",
    name: "Haruki Murakami",
    birthDate: "1949-01-12",
    deathDate: null,
    nationality: "Japanese",
    genre: ["Magical Realism", "Postmodern Literature", "Surrealism"],
    majorWorks: ["Norwegian Wood", "Kafka on the Shore", "1Q84", "The Wind-Up Bird Chronicle"],
    awards: ["Franz Kafka Prize (2006)", "Jerusalem Prize (2009)"],
    bio: "Haruki Murakami is a Japanese writer whose works of fiction and non-fiction have garnered critical acclaim and numerous awards.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Haruki_Murakami_2018.jpg",
    isReligious: false,
    era: "Contemporary Japanese (1949-present)",
    quote: "Pain is inevitable. Suffering is optional.",
    lesson:
      "Murakami teaches us about the surreal nature of modern life, the search for meaning, and the power of music and literature.",
    weekNumber: 16,
  },
  // Week 17
  {
    id: "writer_017",
    name: "Zora Neale Hurston",
    birthDate: "1891-01-07",
    deathDate: "1960-01-28",
    nationality: "American",
    genre: ["Novel", "Folklore", "Anthropology", "Harlem Renaissance"],
    majorWorks: ["Their Eyes Were Watching God", "Mules and Men", "Dust Tracks on a Road"],
    awards: ["Guggenheim Fellowship"],
    bio: "Zora Neale Hurston was an American author, anthropologist, and filmmaker who portrayed racial struggles in the early-1900s American South.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Zora_Neale_Hurston.jpg",
    isReligious: true,
    era: "Harlem Renaissance (1891-1960)",
    quote: "There are years that ask questions and years that answer.",
    lesson:
      "Hurston teaches us about African American culture, the strength of women, and the importance of preserving cultural heritage.",
    weekNumber: 17,
  },
  // Week 18
  {
    id: "writer_018",
    name: "Pablo Neruda",
    birthDate: "1904-07-12",
    deathDate: "1973-09-23",
    nationality: "Chilean",
    genre: ["Poetry", "Love Poetry", "Political Poetry"],
    majorWorks: ["Twenty Love Poems and a Song of Despair", "Canto General", "The Book of Questions"],
    awards: ["Nobel Prize in Literature (1971)"],
    bio: "Pablo Neruda was a Chilean poet-diplomat and politician who won the Nobel Prize for Literature in 1971.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Pablo_Neruda_1963.jpg",
    isReligious: false,
    era: "20th Century Latin American (1904-1973)",
    quote: "You can cut all the flowers but you cannot keep Spring from coming.",
    lesson: "Neruda teaches us about passionate love, political commitment, and the beauty of the natural world.",
    weekNumber: 18,
  },
  // Week 19
  {
    id: "writer_019",
    name: "Octavia Butler",
    birthDate: "1947-06-22",
    deathDate: "2006-02-24",
    nationality: "American",
    genre: ["Science Fiction", "Afrofuturism", "Dystopian Fiction"],
    majorWorks: ["Kindred", "Parable of the Sower", "Bloodchild", "The Patternmaster series"],
    awards: ["Hugo Award", "Nebula Award", "MacArthur Fellowship"],
    bio: "Octavia Butler was an American science fiction author who was one of the first African-American women to gain recognition in the genre.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Octavia_E._Butler_at_the_2005_Brooklyn_Book_Festival.jpg",
    isReligious: false,
    era: "Contemporary American (1947-2006)",
    quote: "All that you touch you change. All that you change changes you.",
    lesson:
      "Butler teaches us about power dynamics, survival, and the potential futures of humanity through the lens of science fiction.",
    weekNumber: 19,
  },
  // Week 20
  {
    id: "writer_020",
    name: "Kahlil Gibran",
    birthDate: "1883-01-06",
    deathDate: "1931-04-10",
    nationality: "Lebanese-American",
    genre: ["Philosophy", "Poetry", "Spiritual Literature"],
    majorWorks: ["The Prophet", "Broken Wings", "The Madman"],
    awards: ["One of the best-selling poets of all time"],
    bio: "Kahlil Gibran was a Lebanese-American writer, poet and visual artist, known for his book 'The Prophet'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Khalil_Gibran_1913.jpg",
    isReligious: true,
    era: "Early 20th Century Lebanese-American (1883-1931)",
    quote: "Your pain is the breaking of the shell that encloses your understanding.",
    lesson: "Gibran teaches us about spiritual wisdom, the unity of all religions, and the beauty of the human soul.",
    weekNumber: 20,
  },
  // Week 21
  {
    id: "writer_021",
    name: "Langston Hughes",
    birthDate: "1902-02-01",
    deathDate: "1967-05-22",
    nationality: "American",
    genre: ["Poetry", "Jazz Poetry", "Harlem Renaissance"],
    majorWorks: ["The Weary Blues", "Montage of a Dream Deferred", "I, Too"],
    awards: ["Spingarn Medal"],
    bio: "Langston Hughes was an American poet, social activist, novelist, playwright, and columnist from Joplin, Missouri.",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Langston_Hughes_1936.jpg",
    isReligious: false,
    era: "Harlem Renaissance (1902-1967)",
    quote: "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.",
    lesson:
      "Hughes teaches us about the African American experience, the power of dreams, and the rhythm of jazz in poetry.",
    weekNumber: 21,
  },
  // Week 22
  {
    id: "writer_022",
    name: "Simone de Beauvoir",
    birthDate: "1908-01-09",
    deathDate: "1986-04-14",
    nationality: "French",
    genre: ["Philosophy", "Feminist Literature", "Existentialism"],
    majorWorks: ["The Second Sex", "The Ethics of Ambiguity", "She Came to Stay"],
    awards: ["Prix Goncourt (1954)"],
    bio: "Simone de Beauvoir was a French writer, intellectual, existentialist philosopher, political activist, feminist, and social theorist.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Simone_de_Beauvoir2.jpg",
    isReligious: false,
    era: "20th Century French Existentialism (1908-1986)",
    quote: "One is not born, but rather becomes, a woman.",
    lesson:
      "De Beauvoir teaches us about women's liberation, existential freedom, and the social construction of gender.",
    weekNumber: 22,
  },
  // Week 23
  {
    id: "writer_023",
    name: "Wole Soyinka",
    birthDate: "1934-07-13",
    deathDate: null,
    nationality: "Nigerian",
    genre: ["Drama", "Poetry", "Novel", "Political Commentary"],
    majorWorks: ["Death and the King's Horseman", "The Lion and the Jewel", "Aké: The Years of Childhood"],
    awards: ["Nobel Prize in Literature (1986) - First African to win"],
    bio: "Wole Soyinka is a Nigerian playwright, novelist, poet, and essayist in the English language.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Wole_Soyinka_2014.jpg",
    isReligious: false,
    era: "Contemporary African (1934-present)",
    quote: "The man dies in all who keep silent in the face of tyranny.",
    lesson:
      "Soyinka teaches us about African identity, the fight against oppression, and the fusion of traditional and modern cultures.",
    weekNumber: 23,
  },
  // Week 24
  {
    id: "writer_024",
    name: "Rainer Maria Rilke",
    birthDate: "1875-12-04",
    deathDate: "1926-12-29",
    nationality: "Austrian",
    genre: ["Poetry", "Philosophy", "Letters"],
    majorWorks: ["Letters to a Young Poet", "Duino Elegies", "Sonnets to Orpheus"],
    awards: ["Influential modernist poet"],
    bio: "Rainer Maria Rilke was a Bohemian-Austrian poet and novelist, widely recognized as one of the most lyrically intense German-language poets.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Rainer_Maria_Rilke%2C_1900.jpg",
    isReligious: true,
    era: "Early Modernist (1875-1926)",
    quote: "The only journey is the one within.",
    lesson:
      "Rilke teaches us about solitude, spiritual growth, and the artist's relationship with beauty and suffering.",
    weekNumber: 24,
  },
  // Week 25
  {
    id: "writer_025",
    name: "Isabel Allende",
    birthDate: "1942-08-02",
    deathDate: null,
    nationality: "Chilean-American",
    genre: ["Magical Realism", "Historical Fiction", "Memoir"],
    majorWorks: ["The House of the Spirits", "City of the Beasts", "Paula"],
    awards: ["Presidential Medal of Freedom (2014)"],
    bio: "Isabel Allende is a Chilean writer whose novels are often based upon her personal experience and pay homage to the lives of women.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Isabel_Allende_-_001.jpg",
    isReligious: false,
    era: "Contemporary Latin American (1942-present)",
    quote: "We don't even know how strong we are until we are forced to bring that hidden strength forward.",
    lesson:
      "Allende teaches us about the strength of women, family history, and the magical elements in everyday life.",
    weekNumber: 25,
  },
  // Week 26
  {
    id: "writer_026",
    name: "Homer",
    birthDate: "800 BC",
    deathDate: "701 BC",
    nationality: "Ancient Greek",
    genre: ["Epic Poetry", "Mythology"],
    majorWorks: ["The Iliad", "The Odyssey"],
    awards: ["Father of Western Literature"],
    bio: "Homer is the legendary ancient Greek epic poet, traditionally said to be the author of the epic poems the Iliad and the Odyssey.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Homer_British_Museum.jpg",
    isReligious: true,
    era: "Ancient Greek (8th century BC)",
    quote: "There is a time for many words, and there is also a time for sleep.",
    lesson: "Homer teaches us about heroism, the human condition, and the power of storytelling to preserve culture.",
    weekNumber: 26,
  },
  // Week 27
  {
    id: "writer_027",
    name: "Confucius",
    birthDate: "551 BC",
    deathDate: "479 BC",
    nationality: "Chinese",
    genre: ["Philosophy", "Ethics", "Political Theory"],
    majorWorks: ["The Analects", "The Five Classics"],
    awards: ["Most influential philosopher in Chinese history"],
    bio: "Confucius was a Chinese philosopher and politician of the Spring and Autumn period who is traditionally considered the paragon of Chinese sages.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Confucius_02.png",
    isReligious: true,
    era: "Ancient Chinese (551-479 BC)",
    quote: "It does not matter how slowly you go as long as you do not stop.",
    lesson: "Confucius teaches us about moral character, social harmony, and the importance of education.",
    weekNumber: 27,
  },
  // Week 28
  {
    id: "writer_028",
    name: "Sophocles",
    birthDate: "497 BC",
    deathDate: "406 BC",
    nationality: "Ancient Greek",
    genre: ["Tragedy", "Drama"],
    majorWorks: ["Oedipus Rex", "Antigone", "Electra"],
    awards: ["Introduced innovations to dramatic structure"],
    bio: "Sophocles was one of three ancient Greek tragedians whose plays have survived. His most famous tragedies feature Oedipus and Antigone.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Sophocles_pushkin_museum.jpg/440px-Sophocles_pushkin_museum.jpg",
    isReligious: true,
    era: "Ancient Greek (497-406 BC)",
    quote: "One must wait until the evening to see how splendid the day has been.",
    lesson: "Sophocles teaches us about fate, free will, and the consequences of human actions.",
    weekNumber: 28,
  },
  // Week 29
  {
    id: "writer_029",
    name: "Lao Tzu",
    birthDate: "6th century BC",
    deathDate: "Unknown",
    nationality: "Chinese",
    genre: ["Philosophy", "Taoism"],
    majorWorks: ["Tao Te Ching"],
    awards: ["Founder of Taoism"],
    bio: "Lao Tzu was an ancient Chinese philosopher and writer. He is the reputed author of the Tao Te Ching and the founder of philosophical Taoism.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Laozi.jpg/440px-Laozi.jpg",
    isReligious: true,
    era: "Ancient Chinese (6th century BC)",
    quote: "A journey of a thousand miles begins with a single step",
    lesson: "Lao Tzu teaches us about simplicity, naturalness, and living in harmony with the Tao.",
    weekNumber: 29,
  },
  // Week 30
  {
    id: "writer_030",
    name: "Geoffrey Chaucer",
    birthDate: "1343",
    deathDate: "1400-10-25",
    nationality: "English",
    genre: ["Poetry", "Narrative", "Medieval Literature"],
    majorWorks: ["The Canterbury Tales", "Troilus and Criseyde"],
    awards: ["Father of English literature"],
    bio: "Geoffrey Chaucer was an English poet and author. Widely considered the greatest English poet of the Middle Ages, he is best known for The Canterbury Tales.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Geoffrey_Chaucer_-_Project_Gutenberg_eText_11658.png/440px-Geoffrey_Chaucer_-_Project_Gutenberg_eText_11658.png",
    isReligious: true,
    era: "Medieval English (1343-1400)",
    quote: "Time and tide wait for no man.",
    lesson: "Chaucer teaches us about human nature, social satire, and the diversity of medieval life.",
    weekNumber: 30,
  },
  // Week 31
  {
    id: "writer_031",
    name: "Hafez",
    birthDate: "1315",
    deathDate: "1390",
    nationality: "Persian",
    genre: ["Poetry", "Lyric Poetry", "Sufi Poetry"],
    majorWorks: ["Divan of Hafez"],
    awards: ["Most popular poet in Iran"],
    bio: "Khwajeh Shams-od-Din Mohammad Hafez-e Shirazi, known by his pen name Hafez, was a Persian lyric poet.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Unknown_artist_-_Hafiz_and_a_youth_-_Google_Art_Project.jpg/440px-Unknown_artist_-_Hafiz_and_a_youth_-_Google_Art_Project.jpg",
    isReligious: true,
    era: "Medieval Persian (1315-1390)",
    quote: "Even after all this time, the sun never says to the earth, 'You owe me.'",
    lesson: "Hafez teaches us about love, divine intoxication, and the beauty of the Persian language.",
    weekNumber: 31,
  },
  // Week 32
  {
    id: "writer_032",
    name: "Murasaki Shikibu",
    birthDate: "c. 978",
    deathDate: "c. 1014 or 1025",
    nationality: "Japanese",
    genre: ["Novel", "Heian Literature"],
    majorWorks: ["The Tale of Genji"],
    awards: ["Considered the world's first novel"],
    bio: "Murasaki Shikibu was a Japanese novelist, poet and lady-in-waiting at the Imperial court during the Heian period. She is best known as the author of The Tale of Genji.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Murasaki_Shikibu.jpg/440px-Murasaki_Shikibu.jpg",
    isReligious: false,
    era: "Heian Period Japan (978-1014)",
    quote: "Those who complain most are most to be pitied; it is they who suffer most.",
    lesson:
      "Murasaki Shikibu teaches us about courtly life, human relationships, and the subtleties of Japanese culture.",
    weekNumber: 32,
  },
  // Week 33
  {
    id: "writer_033",
    name: "Miguel de Cervantes",
    birthDate: "1547-09-29",
    deathDate: "1616-04-23",
    nationality: "Spanish",
    genre: ["Novel", "Playwright", "Poetry"],
    majorWorks: ["Don Quixote"],
    awards: ["Spain's greatest writer"],
    bio: "Miguel de Cervantes Saavedra was a Spanish novelist, poet, and playwright. He is widely regarded as the greatest writer in the Spanish language and one of the world's pre-eminent novelists.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Cervantes2.jpg/440px-Cervantes2.jpg",
    isReligious: true,
    era: "Spanish Golden Age (1547-1616)",
    quote: "He who is not courageous enough to take risks will accomplish nothing in life.",
    lesson: "Cervantes teaches us about idealism, the power of imagination, and the complexities of human nature.",
    weekNumber: 33,
  },
  // Week 34
  {
    id: "writer_034",
    name: "Michel de Montaigne",
    birthDate: "1533-02-28",
    deathDate: "1592-09-13",
    nationality: "French",
    genre: ["Essay", "Philosophy"],
    majorWorks: ["Essays"],
    awards: ["Father of the modern essay"],
    bio: "Michel Eyquem de Montaigne, also known as Lord of Montaigne, was one of the most significant philosophers of the French Renaissance.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Michel_de_Montaigne_1.jpg/440px-Michel_de_Montaigne_1.jpg",
    isReligious: false,
    era: "French Renaissance (1533-1592)",
    quote: "The greatest thing in the world is to know how to belong to oneself.",
    lesson: "Montaigne teaches us about self-reflection, skepticism, and the importance of individual judgment.",
    weekNumber: 34,
  },
  // Week 35
  {
    id: "writer_035",
    name: "Voltaire",
    birthDate: "1694-11-21",
    deathDate: "1778-05-30",
    nationality: "French",
    genre: ["Satire", "Philosophy", "Drama"],
    majorWorks: ["Candide", "Letters Concerning the English Nation"],
    awards: ["Leading figure of the Enlightenment"],
    bio: "François-Marie Arouet, known by his pen name Voltaire, was a French Enlightenment writer, historian, and philosopher famous for his wit, his criticism of Christianity—especially the Roman Catholic Church—and his advocacy of freedom of speech and religion.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Atelier_de_Nicolas_de_Largilli%C3%A8re%2C_portrait_de_Voltaire%2C_vers_1718.jpg/440px-Atelier_de_Nicolas_de_Largilli%C3%A8re%2C_portrait_de_Voltaire%2C_vers_1718.jpg",
    isReligious: false,
    era: "Enlightenment (1694-1778)",
    quote: "I disapprove of what you say, but I will defend to the death your right to say it.",
    lesson: "Voltaire teaches us about reason, tolerance, and the importance of fighting for freedom of expression.",
    weekNumber: 35,
  },
  // Week 36
  {
    id: "writer_036",
    name: "Jean-Jacques Rousseau",
    birthDate: "1712-06-28",
    deathDate: "1778-07-02",
    nationality: "Swiss-born",
    genre: ["Philosophy", "Political Theory", "Autobiography"],
    majorWorks: ["The Social Contract", "Emile, or On Education", "Confessions"],
    awards: ["Influential figure of the Enlightenment"],
    bio: "Jean-Jacques Rousseau was a Genevan philosopher, writer, and composer. His political philosophy influenced the progress of the Enlightenment throughout Europe, as well as aspects of the French Revolution and the development of modern political, sociological, and educational thought.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Jean-Jacques_Rousseau_%28painted_portrait%29.jpg/440px-Jean-Jacques_Rousseau_%28painted_portrait%29.jpg",
    isReligious: false,
    era: "Enlightenment (1712-1778)",
    quote: "Man is born free, and everywhere he is in chains.",
    lesson:
      "Rousseau teaches us about the social contract, the importance of education, and the corrupting influence of society.",
    weekNumber: 36,
  },
  // Week 37
  {
    id: "writer_037",
    name: "Charles Dickens",
    birthDate: "1812-02-07",
    deathDate: "1870-06-09",
    nationality: "English",
    genre: ["Novel", "Social Commentary"],
    majorWorks: ["Oliver Twist", "A Tale of Two Cities", "Great Expectations", "David Copperfield"],
    awards: ["Most popular novelist of the Victorian era"],
    bio: "Charles Dickens was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Charles_Dickens_by_Watkins.jpg/440px-Charles_Dickens_by_Watkins.jpg",
    isReligious: false,
    era: "Victorian Era (1812-1870)",
    quote: "No one is useless in this world who lightens the burdens of another.",
    lesson:
      "Dickens teaches us about social injustice, the importance of compassion, and the resilience of the human spirit.",
    weekNumber: 37,
  },
  // Week 38
  {
    id: "writer_038",
    name: "Victor Hugo",
    birthDate: "1802-02-26",
    deathDate: "1885-05-22",
    nationality: "French",
    genre: ["Novel", "Poetry", "Drama"],
    majorWorks: ["Les Misérables", "The Hunchback of Notre-Dame"],
    awards: ["One of France's greatest writers"],
    bio: "Victor Marie Hugo was a French poet, novelist, essayist, playwright, and dramatist of the Romantic movement.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Victor_Hugo_MET.jpg/440px-Victor_Hugo_MET.jpg",
    isReligious: false,
    era: "Romanticism (1802-1885)",
    quote: "Even the darkest night will end and the sun will rise.",
    lesson:
      "Hugo teaches us about social justice, the power of love, and the importance of fighting for a better world.",
    weekNumber: 38,
  },
  // Week 39
  {
    id: "writer_039",
    name: "Walt Whitman",
    birthDate: "1819-05-31",
    deathDate: "1892-03-26",
    nationality: "American",
    genre: ["Poetry"],
    majorWorks: ["Leaves of Grass"],
    awards: ["Father of free verse"],
    bio: "Walter Whitman was an American poet, essayist, and journalist. A humanist, he was a part of the transition between transcendentalism and realism, incorporating both views in his works.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Walt_Whitman_by_Samuel_Hollyer.jpg/440px-Walt_Whitman_by_Samuel_Hollyer.jpg",
    isReligious: false,
    era: "Transcendentalism (1819-1892)",
    quote: "Keep your face always toward the sunshine, and shadows will fall behind you.",
    lesson: "Whitman teaches us about individualism, democracy, and the beauty of the natural world.",
    weekNumber: 39,
  },
  // Week 40
  {
    id: "writer_040",
    name: "Henry David Thoreau",
    birthDate: "1817-07-12",
    deathDate: "1862-05-06",
    nationality: "American",
    genre: ["Transcendentalism", "Nature Writing", "Philosophy"],
    majorWorks: ["Walden", "Civil Disobedience"],
    awards: ["Leading figure of transcendentalism"],
    bio: "Henry David Thoreau was an American essayist, poet, philosopher, abolitionist, naturalist, tax resister, development critic, surveyor, and historian.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Henry_David_Thoreau_ca._1856.JPG/440px-Henry_David_Thoreau_ca._1856.JPG",
    isReligious: false,
    era: "Transcendentalism (1817-1862)",
    quote:
      "If one advances confidently in the direction of his dreams, and endeavors to live the life which he has imagined, he will meet with a success unexpected in common hours.",
    lesson: "Thoreau teaches us about self-reliance, simple living, and the importance of resisting unjust laws.",
    weekNumber: 40,
  },
  // Week 41
  {
    id: "writer_041",
    name: "Ernest Hemingway",
    birthDate: "1899-07-21",
    deathDate: "1961-07-02",
    nationality: "American",
    genre: ["Novel", "Short Story"],
    majorWorks: ["The Old Man and the Sea", "A Farewell to Arms", "For Whom the Bell Tolls"],
    awards: ["Nobel Prize in Literature (1954)", "Pulitzer Prize for Fiction (1953)"],
    bio: "Ernest Miller Hemingway was an American novelist, short-story writer, journalist, and sportsman. His economical and understated style had a strong influence on 20th-century fiction.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/ErnestHemingway.jpg/440px-ErnestHemingway.jpg",
    isReligious: false,
    era: "Modernism (1899-1961)",
    quote: "The world breaks everyone, and afterward, some are strong at the broken places.",
    lesson: "Hemingway teaches us about courage, resilience, and the importance of facing adversity with grace.",
    weekNumber: 41,
  },
  // Week 42
  {
    id: "writer_042",
    name: "Franz Kafka",
    birthDate: "1883-07-03",
    deathDate: "1924-06-03",
    nationality: "Bohemian (German-speaking)",
    genre: ["Novel", "Short Story", "Existentialism"],
    majorWorks: ["The Metamorphosis", "The Trial", "The Castle"],
    awards: ["Influential figure in 20th-century literature"],
    bio: "Franz Kafka was a German-speaking Bohemian Jewish novelist and short-story writer, widely regarded as one of the major figures of 20th-century literature.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kafka1906_cropped.jpg/440px-Kafka1906_cropped.jpg",
    isReligious: false,
    era: "Modernism (1883-1924)",
    quote:
      "You do not need to leave your room. Remain sitting at your table and listen. You do not even need to listen, simply wait. You do not even need to wait, just learn to become quiet, still and solitary. The world will freely offer itself to you to be unmasked, it has no choice, it will roll in ecstasy at your feet.",
    lesson: "Kafka teaches us about alienation, bureaucracy, and the absurdity of modern life.",
    weekNumber: 42,
  },
  // Week 43
  {
    id: "writer_043",
    name: "Marcel Proust",
    birthDate: "1871-07-10",
    deathDate: "1922-11-18",
    nationality: "French",
    genre: ["Novel"],
    majorWorks: ["In Search of Lost Time"],
    awards: ["One of the most influential authors of the 20th century"],
    bio: "Valentin Louis Georges Eugène Marcel Proust was a French novelist, critic, and essayist who wrote the monumental novel In Search of Lost Time.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Marcel_Proust_c1900s.jpg/440px-Marcel_Proust_c1900s.jpg",
    isReligious: false,
    era: "Modernism (1871-1922)",
    quote: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.",
    lesson: "Proust teaches us about memory, the passage of time, and the complexities of human consciousness.",
    weekNumber: 43,
  },
  // Week 44
  {
    id: "writer_044",
    name: "James Joyce",
    birthDate: "1882-02-02",
    deathDate: "1941-01-13",
    nationality: "Irish",
    genre: ["Novel", "Short Story", "Modernism"],
    majorWorks: ["Ulysses", "Dubliners", "A Portrait of the Artist as a Young Man"],
    awards: ["One of the most influential and important authors of the 20th century"],
    bio: "James Augustine Aloysius Joyce was an Irish novelist, short story writer, poet, teacher, and literary critic. He is best known for Ulysses, a landmark work in which the episodes of Homer's Odyssey are paralleled in a variety of literary styles, perhaps most prominent among these the stream of consciousness technique he helped to popularize.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/James_Joyce_2.jpg/440px-James_Joyce_2.jpg",
    isReligious: false,
    era: "Modernism (1882-1941)",
    quote: "Think you're escaping and run into yourself. Longest way round is the shortest way home.",
    lesson:
      "Joyce teaches us about the complexities of human experience, the power of language, and the search for identity.",
    weekNumber: 44,
  },
  // Week 45
  {
    id: "writer_045",
    name: "Salman Rushdie",
    birthDate: "1947-06-19",
    deathDate: null,
    nationality: "British-Indian",
    genre: ["Magical Realism", "Postcolonial Literature"],
    majorWorks: ["Midnight's Children", "The Satanic Verses", "Haroun and the Sea of Stories"],
    awards: ["Booker Prize", "Whitbread Prize"],
    bio: "Sir Ahmed Salman Rushdie is a British-Indian novelist and essayist. His work, combining magical realism with historical fiction, is primarily concerned with the many connections, disruptions, and migrations between Eastern and Western civilizations, with much of his fiction set on the Indian subcontinent.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Salman_Rushdie_by_David_Shankbone.jpg/440px-Salman_Rushdie_by_David_Shankbone.jpg",
    isReligious: false,
    era: "Contemporary (1947-present)",
    quote:
      "Reality is a question of perspective; the further you get from the past, the more concrete and plausible it seems—but as you approach the present, it inevitably seems incredible.",
    lesson:
      "Rushdie teaches us about the complexities of identity, the clash of cultures, and the power of storytelling.",
    weekNumber: 45,
  },
  // Week 46
  {
    id: "writer_046",
    name: "Margaret Atwood",
    birthDate: "1939-11-18",
    deathDate: null,
    nationality: "Canadian",
    genre: ["Dystopian Fiction", "Science Fiction", "Feminist Literature"],
    majorWorks: ["The Handmaid's Tale", "Oryx and Crake", "The Blind Assassin"],
    awards: ["Booker Prize", "Arthur C. Clarke Award", "Governor General's Award"],
    bio: "Margaret Eleanor Atwood is a Canadian poet, novelist, literary critic, essayist, teacher, environmental activist, and inventor.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Margaret_Atwood_crop.jpg/440px-Margaret_Atwood_crop.jpg",
    isReligious: false,
    era: "Contemporary (1939-present)",
    quote: "A word after a word after a word is power.",
    lesson:
      "Atwood teaches us about the dangers of totalitarianism, the importance of environmentalism, and the power of women's voices.",
    weekNumber: 46,
  },
  // Week 47
  {
    id: "writer_047",
    name: "Paulo Coelho",
    birthDate: "1947-08-24",
    deathDate: null,
    nationality: "Brazilian",
    genre: ["Novel", "Spiritual Literature"],
    majorWorks: ["The Alchemist", "Eleven Minutes", "Veronika Decides to Die"],
    awards: ["Crystal Award (World Economic Forum)"],
    bio: "Paulo Coelho is a Brazilian lyricist and author. He is best known for his novel The Alchemist.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Paulo_Coelho_Frankfurt_Book_Fair_2013.jpg/440px-Paulo_Coelho_Frankfurt_Book_Fair_2013.jpg",
    isReligious: true,
    era: "Contemporary (1947-present)",
    quote: "And, when you want something, all the universe conspires in helping you to achieve it.",
    lesson:
      "Coelho teaches us about following our dreams, listening to our hearts, and the importance of spiritual journeys.",
    weekNumber: 47,
  },
  // Week 48
  {
    id: "writer_048",
    name: "Thomas Aquinas",
    birthDate: "1225",
    deathDate: "1274-03-07",
    nationality: "Italian",
    genre: ["Theology", "Philosophy"],
    majorWorks: ["Summa Theologica", "Summa Contra Gentiles"],
    awards: ["Doctor of the Church"],
    bio: "Thomas Aquinas was an Italian Dominican friar, philosopher, Catholic priest, and theologian. He was an immensely influential philosopher, theologian, and jurist in the tradition of scholasticism.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/SThomaAquinas.jpg/440px-SThomaAquinas.jpg",
    isReligious: true,
    era: "Medieval (1225-1274)",
    quote: "The things that we love tell us what we are.",
    lesson: "Aquinas teaches us about faith, reason, and the relationship between God and humanity.",
    weekNumber: 48,
  },
  // Week 49
  {
    id: "writer_049",
    name: "Kabir",
    birthDate: "1440",
    deathDate: "1518",
    nationality: "Indian",
    genre: ["Poetry", "Mysticism"],
    majorWorks: ["Kabir Granthavali", "Bijak"],
    awards: ["Influential figure in the Bhakti movement"],
    bio: "Kabir was a 15th-century Indian mystic poet and saint, whose writings influenced Hinduism's Bhakti movement and his verses are found in Sikhism's scripture Guru Granth Sahib.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Sant_Kabir_Das.jpg/440px-Sant_Kabir_Das.jpg",
    isReligious: true,
    era: "Bhakti Movement (1440-1518)",
    quote: "If you don't break your ropes while you're alive, do you think ghosts will do it after?",
    lesson:
      "Kabir teaches us about the unity of all religions, the importance of inner experience, and the rejection of dogma.",
    weekNumber: 49,
  },
  // Week 50
  {
    id: "writer_050",
    name: "Teresa of Ávila",
    birthDate: "1515-03-28",
    deathDate: "1582-10-04",
    nationality: "Spanish",
    genre: ["Mysticism", "Autobiography", "Religious Literature"],
    majorWorks: ["The Interior Castle", "The Way of Perfection", "The Book of Her Life"],
    awards: ["Doctor of the Church"],
    bio: "Teresa of Ávila, also known as Saint Teresa of Jesus, was a Spanish Catholic Carmelite nun, mystic, religious reformer, author, theologian of contemplative life and mental prayer.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Saint_Teresa_of_Avila_by_Rubens.jpg/440px-Saint_Teresa_of_Avila_by_Rubens.jpg",
    isReligious: true,
    era: "Spanish Renaissance (1515-1582)",
    quote: "Let nothing disturb you, Let nothing frighten you, All things are passing away: God never changes.",
    lesson:
      "Teresa of Ávila teaches us about prayer, spiritual growth, and the importance of surrendering to God's will.",
    weekNumber: 50,
  },
  // Week 51
  {
    id: "writer_051",
    name: "Chimamanda Ngozi Adichie",
    birthDate: "1977-09-15",
    deathDate: null,
    nationality: "Nigerian",
    genre: ["Novel", "Short Story", "Feminist Literature"],
    majorWorks: ["Half of a Yellow Sun", "Americanah", "Purple Hibiscus"],
    awards: ["Orange Prize for Fiction", "MacArthur Fellowship"],
    bio: "Chimamanda Ngozi Adichie is a Nigerian writer whose works include novels, short stories and nonfiction. She was described in The Times Literary Supplement as 'the most prominent' of a 'procession of critically acclaimed young anglophone authors' of African fiction.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Chimamanda_Ngozi_Adichie_2009.jpg/440px-Chimamanda_Ngozi_Adichie_2009.jpg",
    isReligious: false,
    era: "Contemporary African (1977-present)",
    quote:
      "The single story creates stereotypes, and the problem with stereotypes is not that they are untrue, but that they are incomplete.",
    lesson:
      "Adichie teaches us about the danger of single stories, the complexity of identity, and the importance of diverse narratives.",
    weekNumber: 51,
  },
  // Week 52
  {
    id: "writer_052",
    name: "Ben Okri",
    birthDate: "1959-03-15",
    deathDate: null,
    nationality: "Nigerian-British",
    genre: ["Novel", "Poetry", "Magical Realism"],
    majorWorks: ["The Famished Road", "Songs of Enchantment", "Astonishing the Gods"],
    awards: ["Booker Prize (1991)", "OBE"],
    bio: "Ben Okri is a Nigerian-British author. Okri is considered one of the foremost African authors in the post-modern and post-colonial traditions, and has been compared favourably to authors such as Salman Rushdie and Gabriel García Márquez.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Ben_Okri_2016.jpg/440px-Ben_Okri_2016.jpg",
    isReligious: false,
    era: "Contemporary African (1959-present)",
    quote:
      "The most authentic thing about us is our capacity to create, to overcome, to endure, to transform, to love and to be greater than our suffering.",
    lesson:
      "Okri teaches us about the power of storytelling, the intersection of reality and dreams, and the resilience of the human spirit.",
    weekNumber: 52,
  },
]

// Function to get the current week's writer
export const getCurrentWeekWriter = (): WriterData | null => {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)

  console.log("Current week number:", weekNumber)

  // Ensure we stay within 1-52 range
  const adjustedWeek = weekNumber > 52 ? ((weekNumber - 1) % 52) + 1 : weekNumber

  console.log("Adjusted week number:", adjustedWeek)

  const writer = WRITERS_DATABASE.find((writer) => writer.weekNumber === adjustedWeek)
  console.log("Found writer:", writer)

  return writer || WRITERS_DATABASE[0]
}

// Function to get next week's writer
export const getNextWeekWriter = (): WriterData | null => {
  const now = new Date()
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const startOfYear = new Date(nextWeek.getFullYear(), 0, 1)
  const weekNumber = Math.ceil(((nextWeek.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7)

  const adjustedWeek = weekNumber > 52 ? weekNumber - 52 : weekNumber

  return WRITERS_DATABASE.find((writer) => writer.weekNumber === adjustedWeek) || WRITERS_DATABASE[0]
}

// Function to get all writers
export const getAllWriters = (): WriterData[] => {
  return WRITERS_DATABASE
}

// Function to get writers by category
export const getWritersByCategory = (isReligious: boolean): WriterData[] => {
  return WRITERS_DATABASE.filter((writer) => writer.isReligious === isReligious)
}

// Function to get writers by era
export const getWritersByEra = (era: string): WriterData[] => {
  return WRITERS_DATABASE.filter((writer) => writer.era.toLowerCase().includes(era.toLowerCase()))
}

export const getFallbackWriter = (): WriterData => {
  return WRITERS_DATABASE[0] // Return Shakespeare as fallback
}
