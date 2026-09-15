# Audio scripts

Each stage has one short recording of "Benjamin" looking back on that part of his life. The site currently plays placeholder narration made with the macOS `say` command. To use a real recording:

1. Record the script below. Aim for 15–25 seconds and one take per stage.
2. Export it as `.m4a` (AAC) or `.mp3`.
3. Save it as `public/audio/stage-N.m4a`, replacing the placeholder. If you use `.mp3`, change `audio.src` for that stage in `src/content/stages.js`.
4. If you change the wording, update `audio.transcript` in `src/content/stages.js` too, so the on-page transcript matches.

Voice direction: as the site goes on, Benjamin should sound younger. Start slow and gravelly, and finish soft and sleepy, like a small child.

## Stage 1: The End (1860–1880)

> I was born an old man. My father looked at me like a bill he would have to pay. People see the beard and the cane and they think they are looking at the end of a life. I am starting to think it is the beginning of one.

## Stage 2: The Family (1880–1897)

> Hildegarde liked that I seemed wise. The truth is I was learning everything for the first time, same as her. We had a boy. For a few good years, the three of us looked like a family anyone would recognize.

## Stage 3: The Height of Life (1897–1910)

> They would call this the height of a life. Every year I felt stronger while everyone I loved got tired. I kept going out dancing. I think I was running from watching her grow old.

## Stage 4: The Beginning of Youth (1910–1920)

> I went back to school and I won. I tried to go back to war and they sent me home. My son is embarrassed by me now. Youth is supposed to feel like a start. Mine felt like being left behind.

## Stage 5: The Beginning (1920–1930)

> There are blocks. And Nana. And the milk is warm. I don't remember a war. I don't remember her name. Everything is soft, and then it's dark, and it's quiet.

## Regenerating the placeholders

From `public/audio`:

```bash
say -v 'Grandpa (English (US))' -r 140 -o stage-1.aiff "…script…" && afconvert -f m4af -d aac -b 64000 stage-1.aiff stage-1.m4a
```

The other placeholder voices used were: Reed (stage 2), Eddy (stage 3), Rocko (stage 4) and Junior (stage 5).
