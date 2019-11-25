# solid-tone-mp3
Solid tone mp3 files for when you just can't make them yourself.

This repository was created in order to play solid tones for Google Assistant. The tones were created using ffmpeg with the script in generate.js.

The lack of lavfi support in ffmpeg.js, the lack of solid tone support in SSML, and the inability to use native dependencies in Cloud Functions made this a requirement. 

Each file is a 0.1 second mp3 at the frequency in the file name.
