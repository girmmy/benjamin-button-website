# Audio scripts

Each stage has one short recording of "Benjamin" looking back on that part of his life. Every line is drawn from Fitzgerald's story. The site currently plays placeholder narration made with the macOS `say` command. To use a real recording:

1. Record the script below. Aim for 15–25 seconds and one take per stage.
2. Export it as `.m4a` (AAC) or `.mp3`.
3. Save it as `public/audio/stage-N.m4a`, replacing the placeholder. If you use `.mp3`, change `audio.src` for that stage in `src/content/stages.js`.
4. If you change the wording, update `audio.transcript` in `src/content/stages.js` too, so the on-page transcript matches.

Voice direction: as the site goes on, Benjamin should sound younger. Start slow and gravelly, and finish soft and sleepy, like a small child.

## Stage 1: The End (1860–1880)

> They gave me a rattle on the first day and told me to play with it, so I jingled it whenever anyone was listening. I would rather have my father's Havana cigars and a volume of the encyclopaedia. People look at the beard and think they are seeing the end of a life. It is the first week of one.

## Stage 2: The Family (1880–1897)

> Hildegarde married me because I looked fifty and settled. In the fifteen years after the wedding the family fortune doubled, and every morning the blood moved a little faster than the morning before. I was the first man in Baltimore to own and run an automobile. My wife was less delighted by all of this than I was.

## Stage 3: The Height of Life (1897–1910)

> I joined the army in ninety-eight because my own house had stopped being interesting. I came home a lieutenant-colonel with a medal and found that I looked thirty. I had hoped that once I caught up with my own age the thing would stop. It did not stop.

## Stage 4: The Beginning of Youth (1910–1920)

> In my first year at Harvard the whole college knew my name. By my senior year I could not make the team, and a sophomore took me for a freshman. Then the Army made me a general and a sentry called me sonny. My son would like me to call him Uncle.

## Stage 5: The Beginning (1920–1930)

> There is Nana, and the park, and the big orange ball she points at and calls sun. There are bright strips of paper I can no longer understand. I do not remember a war. I do not remember her name. When I am hungry I cry. That is all.

## Regenerating the placeholders

From `public/audio`:

```bash
say -v 'Grandpa (English (US))' -r 140 -o stage-1.aiff "…script…" && afconvert -f m4af -d aac -b 64000 stage-1.aiff stage-1.m4a
```

The other placeholder voices used were: Reed (stage 2), Eddy (stage 3), Rocko (stage 4) and Junior (stage 5).
