import YoutubeHome, { YoutubeHomeObserver } from "@components/youtube/YoutubeHome"

import ComponentBuilder from "@modules/ComponentBuilder"

const youtubeHome: YoutubeHome = new ComponentBuilder(YoutubeHome)
  .addName('youtube-home')
  .addUrl('https://www.youtube.com')
  .addObserver(YoutubeHomeObserver)
  .build()