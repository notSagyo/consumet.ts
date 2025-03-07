import { META } from '../../src/providers';

jest.setTimeout(120000);

test('returns a filled array of anime list', async () => {
  const anilist = new META.Anilist();
  const data = await anilist.search('spy x family');
  expect(data.results).not.toEqual([]);
});

test('returns a filled object of anime data', async () => {
  const anilist = new META.Anilist();
  const data = await anilist.fetchAnimeInfo('140960');
  expect(data).not.toBeNull();
  expect(data.episodes).not.toEqual([]);
  expect(data.description).not.toBeNull();
});

test('returns a filled array of servers', async () => {
  const anilist = new META.Anilist();
  const data = await anilist.fetchEpisodeServers('spy-x-family-episode-9');
  expect(data).not.toEqual([]);
});

test('returns a filled object of episode sources', async () => {
  const anilist = new META.Anilist();
  const data = await anilist.fetchEpisodeSources('spy-x-family-episode-9');
  expect(data.sources).not.toEqual([]);
});

test('returns a filled array of trending anime', async () => {
  const anilist = new META.Anilist();
  const data = await anilist.fetchTrendingAnime(1 , 10);
  expect(data.results).not.toEqual([]);
});

test('returns a filled array of popular anime', async () => {
  const anilist = new META.Anilist();
  const data = await anilist.fetchPopularAnime(1 , 10);
  expect(data.results).not.toEqual([]);
})
