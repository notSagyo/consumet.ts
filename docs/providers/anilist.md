<h1>Anilist</h1>
This is a custom provider that maps an anime provider (like gogoanime) to anilist and kitsu.

`Anilist` class takes a [`AnimeParser`](https://github.com/consumet/extensions/blob/master/src/models/anime-parser.ts) object as a parameter **(optional)**. This object is used to parse the anime episodes from the provider, then mapped to anilist and kitsu.

```ts
const anilist = new META.Anilist();
```

<h2>Methods</h2>

- [search](#search)
- [fetchTrendingAnime](#fetchtrendinganime)
- [fetchPopularAnime](#fetchpopularanime)
- [fetchAnimeInfo](#fetchanimeinfo)
- [fetchEpisodeSources](#fetchepisodesources)

### search

<h4>Parameters</h4>

| Parameter            | Type     | Description                                                                         |
| -------------------- | -------- | ----------------------------------------------------------------------------------- |
| query                | `string` | query to search for. (*In this case, We're searching for `Classroom of the elite`*) |
| page (optional)      | `number` | page number to search for.                                                          |
| perPage   (optional) | `number` | number of results per page.  **Default: 15**                                        |

```ts
anilist.search("Classroom of the elite").then(data => {
  console.log(data);
}
```

returns a promise which resolves into an array of anime. (*[`Promise<ISearch<IAnimeResult[]>>`](https://github.com/consumet/extensions/blob/master/src/models/types.ts#L13-L26)*)\
output:
```js
{
  currentPage: 1,
  hasNextPage: false,
  results: [
    {
      id: '98659',
      title: {
         romaji: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e',
         english: 'Classroom of the Elite',
         native: 'ようこそ実力至上主義の教室へ',
         userPreferred: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e'
      },
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b98659-sH5z5RfMuyMr.png',
      rating: 77,
      releasedDate: 2017
    },
    {
      id: '145545',
      title: {
         romaji: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 2nd Season',
         english: 'Classroom of the Elite Season 2',
         native: 'ようこそ実力至上主義の教室へ 2nd Season',
         userPreferred: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 2nd Season'
      },
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx145545-DGl3LVvFlnHi.png',
      rating: 79,
      releasedDate: 2022
    }
    {...}
    ...
  ]
}
```

### fetchTrendingAnime

<h4>Parameters</h4>

| Parameter          | Type     | Description                 |
| ------------------ | -------- | --------------------------- |
| page (optional)    | `number` | page number to search for.  |
| perPage (optional) | `number` | number of results per page. |

```ts
anilist.fetchTrendingAnime().then(data => {
  console.log(data);
}
```

returns a promise which resolves into an array of anime. (*[`Promise<ISearch<IAnimeResult[]>>`](https://github.com/consumet/extensions/blob/master/src/models/types.ts#L13-L26)*)\
output:
```ts
{
  currentPage: 1,
  hasNextPage: true,
  results: [
    {
      id: '153288',
      malId: null,
      title: {
          romaji: 'Kaijuu 8-gou',
          english: 'Kaiju No.8',
          native: '怪獣８号',
          userPreferred: 'Kaijuu 8-gou'
      },
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx153288-INFE21hHhAUD.jpg',
      trailer: {
          id: '-MaTda-Ws3Y',
          site: 'youtube',
          thumbnail: 'https://i.ytimg.com/vi/-MaTda-Ws3Y/hqdefault.jpg'
      },
      cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx153288-INFE21hHhAUD.jpg',
      rating: null,
      releaseDate: null,
      totalEpisodes: 0,
      duration: null,
      type: null
    },
    {
      id: '130592',
      malId: 48413,
      title: {...},
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx130592-LAUlhx15mxQu.jpg',
      trailer: {...},
      cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/130592-WPfrW1SR4dnY.jpg',
      rating: 74,
      releaseDate: 2022,
      totalEpisodes: 12,
      duration: 24,
      score: 75,
      type: 'TV'
    },
  ]
}
```

### fetchPopularAnime

<h4>Parameters</h4>

| Parameter          | Type     | Description                 |
| ------------------ | -------- | --------------------------- |
| page (optional)    | `number` | page number to search for.  |
| perPage (optional) | `number` | number of results per page. |

```ts
anilist.fetchPopularAnime().then(data => {
  console.log(data);
}
```

returns a promise which resolves into an array of anime. (*[`Promise<ISearch<IAnimeResult[]>>`](https://github.com/consumet/extensions/blob/master/src/models/types.ts#L13-L26)*)\
output:
```ts
{
  currentPage: 1,
  hasNextPage: true,
  results: [
    {
      id: '153288',
      malId: null,
      title: {
          romaji: 'Kaijuu 8-gou',
          english: 'Kaiju No.8',
          native: '怪獣８号',
          userPreferred: 'Kaijuu 8-gou'
      },
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx153288-INFE21hHhAUD.jpg',
      trailer: {
          id: '-MaTda-Ws3Y',
          site: 'youtube',
          thumbnail: 'https://i.ytimg.com/vi/-MaTda-Ws3Y/hqdefault.jpg'
      },
      cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx153288-INFE21hHhAUD.jpg',
      rating: null,
      releaseDate: null,
      totalEpisodes: 0,
      duration: null,
      type: null
    },
    {
      id: '130592',
      malId: 48413,
      title: {...},
      image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx130592-LAUlhx15mxQu.jpg',
      trailer: {...},
      cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/130592-WPfrW1SR4dnY.jpg',
      rating: 74,
      releaseDate: 2022,
      totalEpisodes: 12,
      duration: 24,
      score: 75,
      type: 'TV'
    },
  ]
}
```

### fetchAnimeInfo

<h4>Parameters</h4>

| Parameter      | Type      | Description                                                                                               |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| id             | `string`  | takes anime id as a parameter. (*anime id can be found in the anime search results or anime info object*) |
| dub (optional) | `boolean` | if true, will fetch dubbed anime.  **Default: false**                                                     |


```ts
anilist.fetchAnimeInfo("98659").then(data => {
  console.log(data);
}
```

returns a promise which resolves into an anime info object (including the episodes). (*[`Promise<IAnimeInfo>`](https://github.com/consumet/extensions/blob/master/src/models/types.ts#L28-L42)*)\
output:
```js
{
  id: '98659',
  title: {
    romaji: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e',
    english: 'Classroom of the Elite',
    native: 'ようこそ実力至上主義の教室へ',
    userPreferred: 'Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e'
  },
  malId: 35507,
  trailer: {
    id: 'gMZDGyihTyc',
    site: 'youtube',
    thumbnail: 'https://i.ytimg.com/vi/gMZDGyihTyc/hqdefault.jpg'
  },
  image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b98659-sH5z5RfMuyMr.png',
  cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/111321-nnetF1qONAcE.jpg',
  description: 'Koudo Ikusei Senior High School is a leading school with state-of-the-art facilities. The students there have the freedom to wear any hairstyle ...',
  status: 'Completed',
  releaseDate: 2017,
  rating: 77,
  duration: 24,
  genres: [ 'Drama', 'Psychological' ],
  studios: [ 'Lerche' ],
  subOrDub: 'sub',
  recommendations: [ 
      {
        id: 101921,
        idMal: 37999,
        title: {
          romaji: 'Kaguya-sama wa Kokurasetai: Tensaitachi no Renai Zunousen',
          english: 'Kaguya-sama: Love is War',
          native: undefined,
          userPreferred: undefined
        },
        status: 'Completed',
        episodes: 12,
        image: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101921-VvdGQy1ZySYf.jpg',
        cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101921-GgvvFhlNhzlF.jpg',
        score: 83
      },
      {...}
      ...
  ],
  episodes: [
    {
      id: 'youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e-tv-episode-12',
      title: 'What is evil? Whatever springs from weakness.',
      image: 'https://media.kitsu.io/episodes/thumbnails/228542/original.jpg',
      number: 12,
      description: "Melancholy, unmotivated Ayanokoji Kiyotaka attends his first day at Tokyo Metropoiltan Advanced Nuturing High School, ...",
      url: '...'
    },
    {...}
    ...
  ]
}
```

### fetchEpisodeSources

<h4>Parameters</h4>

| Parameter | Type     | Description                                                                           |
| --------- | -------- | ------------------------------------------------------------------------------------- |
| episodeId | `string` | takes episode id as a parameter. (*episode id can be found in the anime info object*) |


In this example, we're getting the sources for the first episode of classroom of the elite.


```ts
anilist.fetchEpisodeSources("youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e-tv-episode-12").then(data => {
  console.log(data);
}
```

returns a promise which resolves into an array of episode sources. (*[`Promise<ISource>`](https://github.com/consumet/extensions/blob/master/src/models/types.ts#L210-L214)*)\
output:
```js
{
  headers: {
    Referer: 'https://goload.pro/streaming.php?id=MTAxMTU3&title=Youkoso+Jitsuryoku+Shijou+Shugi+no+Kyoushitsu+e+%28TV%29+Episode+12&typesub=SUB'
  },
  sources: [
    {
      url: 'https://manifest.prod.boltdns.net/manifest/v1/hls/v4/clear/6310475588001/d34ba94f-c1db-4b05-a0b2-34d5a40134b2/6s/master.m3u8?fastly_token=NjJjZjkxZGFfODlmNWQyMWU1ZDM1NzhlNWM1MGMyMTBkNjczMjY4YjQ5ZGMyMzEzMWI2YjgyZjVhNWRhMDU4YmI0NjFjMTY4Zg%3D%3D',
      isM3U8: true
    },
    {
      url: 'https://www13.gogocdn.stream/hls/ba0b5d73fb1737d2e8007c65f347dae8/ep.12.1649784300.m3u8',
      isM3U8: true
    }
  ]
}
```

Make sure to check the `headers` property of the returned object. It contains the referer header, which is needed to bypass the 403 error and allow you to stream the video without any issues.

<p align="end">(<a href="https://github.com/consumet/extensions/blob/master/docs/guides/meta.md#">back to meta providers list</a>)</p>