// All of the site's words live here, so the outline can be swapped in without touching layout code.
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
        body: 'They wrapped me in a hospital blanket and my beard came out over the top of it. I asked for a chair. There was only a crib. Father would not look at me until the nurse left.',
      },
      {
        date: 'September 1878',
        body: 'The registrar at Yale asked if I was playing a joke. Half the freshman class followed me to the train. I am eighteen years old. I look like the man who should be running the place.',
      },
    ],
    audio: {
      src: '/audio/stage-1.m4a',
      file: 'benjamin_1860.ra',
      transcript:
        'I was born an old man. My father looked at me like a bill he would have to pay. People see the beard and the cane and they think they are looking at the end of a life. I am starting to think it is the beginning of one.',
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
        date: '1880-06-14 23:40',
        subject: 'the Shevlins’ dance',
        mood: 'smitten',
        music: 'a waltz, played slightly too fast',
        body: 'Her name is Hildegarde Moncrief. She told me men of fifty are the only ones worth talking to. I did not tell her I was twenty.',
      },
      {
        date: '1882-03-02 06:15',
        subject: 'a boy',
        mood: 'tender',
        music: 'nothing, finally',
        body: 'A son. Roscoe. He held my finger all night. Every year he will get a little older and I will get a little younger. For a while we will meet in the middle.',
      },
    ],
    guestbook: [
      { name: 'Hildegarde', text: 'You dance like a much younger man. xoxo' },
      { name: 'Roger Button', text: 'Please be at the store by eight. The hinges came in.' },
      { name: 'Mrs. Shevlin', text: 'What a lovely couple. What a curious couple.' },
    ],
    audio: {
      src: '/audio/stage-2.m4a',
      file: 'Benjamin Button - The Family',
      transcript:
        'Hildegarde liked that I seemed wise. The truth is I was learning everything for the first time, same as her. We had a boy. For a few good years, the three of us looked like a family anyone would recognize.',
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
        date: 'July 4, 1898',
        title: 'Home from Cuba',
        body: 'They gave me a medal for San Juan Hill. I came home and ran up the front steps two at a time. Hildegarde took them one at a time and asked me to slow down.',
        tags: ['san juan hill', 'the army', 'home'],
        comments: [
          { name: 'Hildegarde', text: 'I am glad you are home. Please sit with me tonight.' },
        ],
      },
      {
        date: 'December 31, 1909',
        title: 'Out again',
        body: 'Danced until four. A girl asked if Hildegarde was my mother. I did not correct her, and I am not proud of it. I have stopped asking Hildegarde to come out with me.',
        tags: ['dancing', 'hildegarde', 'new year'],
        comments: [
          { name: 'Hildegarde', text: 'You were out until four. Again.' },
          { name: 'Roscoe', text: 'Father, people are talking.' },
        ],
      },
    ],
    audio: {
      src: '/audio/stage-3.m4a',
      file: 'The Height of Life',
      transcript:
        'They would call this the height of a life. Every year I felt stronger while everyone I loved got tired. I kept going out dancing. I think I was running from watching her grow old.',
    },
    memories: ['medal', 'shoes', 'mirror', 'keys'],
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
        date: 'November 1912',
        body: 'Harvard took me as a freshman. Nobody chased me to the train this time. Against Yale I ran until they stopped counting: seven touchdowns and fourteen field goals.',
      },
      {
        date: 'April 1917',
        body: 'The Army sent a letter making me a brigadier general. I put on the uniform and reported to camp. The sentry laughed and sent for my son. Roscoe drove me home without a word, then asked me to call him Uncle.',
      },
    ],
    chat: [
      { from: 'roscoe', text: 'You can’t call me Father in front of people.' },
      { from: 'roscoe', text: 'It looks ridiculous.' },
      { from: 'benjamin', text: 'What should I call you then?' },
      { from: 'roscoe', text: 'Uncle. Not Roscoe. Uncle.' },
    ],
    audio: {
      src: '/audio/stage-4.m4a',
      file: 'the beginning of youth',
      transcript:
        'I went back to school and I won. I tried to go back to war and they sent me home. My son is embarrassed by me now. Youth is supposed to feel like a start. Mine felt like being left behind.',
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
      { date: 'Monday', body: 'Kindergarten with Roscoe’s boy. I built the blocks up very high. Miss Bailey said good.' },
      { date: 'Tuesday', body: 'Nana gave me milk. It was warm.' },
      { date: 'Wednesday', body: 'blocks' },
      { date: '', body: '' },
    ],
    audio: {
      src: '/audio/stage-5.m4a',
      file: 'Voice memo',
      transcript:
        'There are blocks. And Nana. And the milk is warm. I don’t remember a war. I don’t remember her name. Everything is soft, and then it’s dark, and it’s quiet.',
    },
    memories: ['blocks', 'nana', 'milk', 'crib'],
  },
];

export const MEMORY_TEXT = {
  rattle: { title: 'The rattle', caption: 'On the first day his father put a rattle in his hand. He shook it, politely, whenever anyone was watching.' },
  cigar: { title: 'Havana cigars', caption: 'He preferred his father’s cigars to his toy soldiers, and was caught with them more than once.' },
  encyclopaedia: { title: 'Encyclopaedia Britannica', caption: 'While other children played, he sat in the nursery reading the encyclopaedia, one volume at a time.' },
  yale: { title: 'A letter from Yale', caption: 'New Haven, 1878. The registrar thought a man his age applying as a freshman had to be a prank.' },

  dancecard: { title: 'Dance card', caption: 'The Shevlins’ dance, 1880. Hildegarde gave him every waltz on her card.' },
  invitation: { title: 'Wedding invitation', caption: 'General Moncrief’s daughter married a man half of Baltimore took for fifty.' },
  catalog: { title: 'Roger Button & Co.', caption: 'Wholesale hardware. In the fifteen years after the wedding, the family fortune doubled.' },
  roscoe: { title: 'A son', caption: 'Roscoe. Father and son were headed toward the same age from opposite directions.' },

  medal: { title: 'The medal', caption: 'San Juan Hill, 1898. Promoted to lieutenant-colonel, slightly wounded, sent home with a medal.' },
  shoes: { title: 'Dancing shoes', caption: 'He wore through a pair every season. Hildegarde stayed home.' },
  mirror: { title: 'Hildegarde’s mirror', caption: 'Her hair was turning gray. In the same glass, he looked younger every year.' },
  keys: { title: 'The keys to the store', caption: '1910. He handed Roger Button & Co. to Roscoe and went back to school.' },

  program: { title: 'Harvard vs. Yale', caption: 'Seven touchdowns and fourteen field goals. The whole stadium knew his name.' },
  uncle: { title: 'A note from Roscoe', caption: 'His son asked to be called Uncle, so strangers would stop staring.' },
  commission: { title: 'The commission', caption: '1917. The Army named him a brigadier general. The sentry at camp saw a boy of thirteen.' },
  uniform: { title: 'The uniform', caption: 'Tailored for a grown man in 1898. By 1917 it hung on him like a blanket.' },

  blocks: { title: 'Blocks', caption: 'He stacked them very high. Then he forgot what they spelled.' },
  nana: { title: 'Nana', caption: 'Her face was the one he looked for.' },
  milk: { title: 'Warm milk', caption: 'warm.' },
  crib: { title: '', caption: '' },
};
