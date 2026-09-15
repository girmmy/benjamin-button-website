// All of the site's words live here. Every fact, quote and date comes from Fitzgerald's
// 1922 story "The Curious Case of Benjamin Button".
// Years and "looks" ages line up: he always looks 70 minus however many years he has been alive.

export const STAGES = [
  {
    id: 1,
    era: '1995',
    title: 'The End',
    years: [1860, 1880],
    looks: [70, 50],
    url: 'http://www.buttonhardware.com/benjamin/index.html',
    diary: [
      {
        date: 'September 1860',
        body: 'Wrapped in a white blanket and crammed into a crib, with my feet hanging over the sides. The first thing I asked the man staring down at me was whether he was my father. Then I asked for a comfortable rocker. Then I asked for a cane.',
      },
      {
        date: 'September 1878',
        body: 'The registrar had my age down as eighteen, which is my age. He called me a dangerous lunatic and gave me eighteen minutes to get out of town. Half the college followed me to the station. One of them shouted, go up to Harvard. I may.',
      },
    ],
    audio: {
      src: '/audio/stage-1.m4a',
      file: 'benjamin_1860.ra',
      transcript:
        'They gave me a rattle on the first day and told me to play with it, so I jingled it whenever anyone was listening. I would rather have my father’s Havana cigars and a volume of the encyclopaedia. People look at the beard and think they are seeing the end of a life. It is the first week of one.',
    },
    memories: ['rattle', 'cigar', 'encyclopaedia', 'yale'],
  },
  {
    id: 2,
    era: '2001',
    title: 'The Family',
    years: [1880, 1897],
    looks: [50, 33],
    url: 'http://www.geocities.com/Heartland/Porch/1880/',
    diary: [
      {
        date: '1880-08-14 03:20',
        subject: 'the dance at the Shevlins’',
        mood: 'in love',
        music: 'the latest waltz from Paris',
        body: 'Her name is Hildegarde Moncrief. She took me for my father’s brother and I did not correct her. She says fifty is the mellow age and she would rather marry a man of fifty and be taken care of. I am twenty.',
      },
      {
        date: '1881-06-02 06:15',
        subject: 'a son',
        mood: 'steady',
        music: 'none, finally',
        body: 'Roscoe. The engagement alone was enough scandal for Baltimore — the New York papers drew my head on a fish and called me the Mystery Man of Maryland. Now there is a boy who will grow up while I grow down. We will pass each other somewhere in the middle.',
      },
    ],
    guestbook: [
      { name: 'Hildegarde', text: 'I like men of your age. Young boys are so idiotic.' },
      { name: 'Roger Button', text: 'There is a great future in this business. Be at the store by eight.' },
      { name: 'General Moncrief', text: 'I would rather fall upon my sword than announce this engagement.' },
    ],
    audio: {
      src: '/audio/stage-2.m4a',
      file: 'Benjamin Button - The Family',
      transcript:
        'Hildegarde married me because I looked fifty and settled. In the fifteen years after the wedding the family fortune doubled, and every morning the blood moved a little faster than the morning before. I was the first man in Baltimore to own and run an automobile. My wife was less delighted by all of this than I was.',
    },
    memories: ['dancecard', 'invitation', 'catalog', 'roscoe'],
  },
  {
    id: 3,
    era: '2007',
    title: 'The Height of Life',
    years: [1897, 1910],
    looks: [33, 20],
    url: 'http://www.benjam.in/',
    diary: [
      {
        date: 'June 1900',
        title: 'Home from the war',
        body: 'A commission as captain, then major, then lieutenant-colonel, just in time for the charge up San Juan Hill. Slightly wounded. One medal. A brass band met me at the station and walked me home, and Hildegarde waved a large silk flag on the porch.',
        tags: ['san juan hill', 'the army', 'home'],
        comments: [{ name: 'Baltimore', text: 'He seems to grow younger every year.' }],
      },
      {
        date: 'September 1900',
        title: 'The mirror upstairs',
        body: 'I held the photograph of myself in uniform up beside my face in the glass. The process is continuing. I look thirty. Hildegarde is forty, with a faint skirmish line of gray, and I am the one who cannot be looked at straight.',
        tags: ['the mirror', 'growing younger', 'hildegarde'],
        comments: [
          { name: 'Hildegarde', text: 'You appear annoyed. Is something amiss?' },
          { name: 'Roscoe', text: 'Father, this is not efficient.' },
        ],
      },
    ],
    audio: {
      src: '/audio/stage-3.m4a',
      file: 'The Height of Life',
      transcript:
        'I joined the army in ninety-eight because my own house had stopped being interesting. I came home a lieutenant-colonel with a medal and found that I looked thirty. I had hoped that once I caught up with my own age the thing would stop. It did not stop.',
    },
    memories: ['medal', 'motorcar', 'mirror', 'keys'],
  },
  {
    id: 4,
    era: '2015',
    title: 'The Beginning of Youth',
    years: [1910, 1920],
    looks: [20, 10],
    url: 'https://benjaminbutton.co/the-beginning-of-youth',
    diary: [
      {
        date: 'November 1910',
        body: 'Harvard took me as a freshman, and in the game against Yale I scored seven touchdowns and fourteen field goals and one entire Yale eleven was carried from the field. Thirty-two years ago a registrar gave me eighteen minutes to leave New Haven. I told them they would regret it.',
      },
      {
        date: 'April 1917',
        body: 'The Army called back its Spanish-American officers and made me a brigadier-general. The tailor on Charles Street asked if I wanted to play soldier. At Camp Mosby the sentry asked where I was going with the general’s duds, and a colonel on a horse asked whose little boy I was. Roscoe came down and took me home without the uniform.',
      },
    ],
    chat: [
      { from: 'roscoe', text: 'You’d better turn right around and start back the other way.' },
      { from: 'roscoe', text: 'This has gone too far to be a joke.' },
      { from: 'benjamin', text: 'I only want to go to prep school.' },
      { from: 'roscoe', text: 'And call me Uncle. Not Roscoe. Uncle.' },
    ],
    audio: {
      src: '/audio/stage-4.m4a',
      file: 'the beginning of youth',
      transcript:
        'In my first year at Harvard the whole college knew my name. By my senior year I could not make the team, and a sophomore took me for a freshman. Then the Army made me a general and a sentry called me sonny. My son would like me to call him Uncle.',
    },
    memories: ['program', 'uncle', 'commission', 'uniform'],
  },
  {
    id: 5,
    era: '2026',
    title: 'The Beginning',
    years: [1920, 1930],
    looks: [10, 0],
    url: 'button.life',
    diary: [
      { date: '1925', body: 'Roscoe took his boy and me to kindergarten on the same day. We made mats and chains out of coloured paper. It is the most fascinating game in the world.' },
      { date: 'the park', body: 'Nana points at the great gray monster and says elephant. Elyphant, elyphant, elyphant.' },
      { date: 'five o’clock', body: 'oatmeal' },
      { date: '', body: '' },
    ],
    audio: {
      src: '/audio/stage-5.m4a',
      file: 'Voice memo',
      transcript:
        'There is Nana, and the park, and the big orange ball she points at and calls sun. There are bright strips of paper I can no longer understand. I do not remember a war. I do not remember her name. When I am hungry I cry. That is all.',
    },
    memories: ['paper', 'nana', 'milk', 'crib'],
  },
];

export const MEMORY_TEXT = {
  rattle: { title: 'The rattle', caption: 'His father brought home a rattle and insisted he play with it. He could be heard jingling it obediently at intervals throughout the day.' },
  cigar: { title: 'A dark Havana', caption: 'His father walked into the nursery and found it full of faint blue haze, and a guilty old man hiding the butt of a cigar.' },
  encyclopaedia: { title: 'Encyclopaedia Britannica', caption: 'He stole down the back stairs for a volume and pored over it all afternoon, while the cotton cows and the Noah’s ark lay neglected on the floor.' },
  yale: { title: 'Yale College, 1878', caption: 'The registrar had his age down as eighteen. He was told to get out of college and get out of town, and half the undergraduates followed him to the train.' },

  dancecard: { title: 'The dance card', caption: 'The Shevlins’ country house, August 1880. She gave him two more dances and a drive the following Sunday.' },
  invitation: { title: 'The engagement', caption: 'General Moncrief said he would rather fall upon his sword than announce it. Baltimore decided it was criminal. She married him anyway.' },
  catalog: { title: 'Roger Button & Co.', caption: 'In the fifteen years after the wedding the family fortune doubled, helped by a coup in 1890 that saved the firm six hundred nails a year.' },
  roscoe: { title: 'A son', caption: 'Roscoe: the one person in the house who would get older every year while his father got younger.' },

  medal: { title: 'The medal', caption: 'Captain, then major, then lieutenant-colonel, just in time for the charge up San Juan Hill. Slightly wounded. A brass band met him at the station.' },
  motorcar: { title: 'The automobile', caption: 'He was the first man in the city of Baltimore to own and run an automobile. His contemporaries stared at the picture he made of health and vitality.' },
  mirror: { title: 'The mirror upstairs', caption: 'He held a photograph of himself in uniform beside his face in the glass. There was no doubt of it: he looked thirty, and he was uneasy.' },
  keys: { title: 'The keys to the store', caption: '1910. Roger Button & Co. was handed over to young Roscoe, and his father entered himself as a freshman at Harvard.' },

  program: { title: 'Harvard vs. Yale', caption: 'Seven touchdowns and fourteen field goals, and one entire Yale eleven carried singly from the field. He was the most celebrated man in college.' },
  uncle: { title: '“Call me Uncle”', caption: 'Not Roscoe, but Uncle, so that visitors in the house would stop looking at a boy of fifteen calling a grown man by his first name.' },
  commission: { title: 'The commission', caption: '1917. Reserve officers from the Spanish-American War were called back with a higher rank. His said brigadier-general, report immediately.' },
  uniform: { title: 'The uniform', caption: 'The dealer had trouble finding a general’s insignia, and suggested a nice badge instead. It would look just as well and be much more fun to play with.' },

  paper: { title: 'Coloured paper', caption: 'Mats and chains and curious and beautiful designs. He went back a third year, and by then he was too little to understand what the bright shining strips were for.' },
  nana: { title: 'Nana', caption: 'His nurse, in her starched gingham dress, became the centre of his tiny world. On bright days they walked in the park.' },
  milk: { title: 'Warm milk', caption: 'He could not remember clearly whether the milk at his last feeding was warm or cool.' },
  crib: { title: '', caption: '' },
};
