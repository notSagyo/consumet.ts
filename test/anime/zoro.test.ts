import { ANIME } from '../../src/providers';

jest.setTimeout(120000);

test('returns a filled array of anime list', async () => {
  const zoro = new ANIME.Zoro();
  const data = await zoro.search('Overlord IV');
  expect(data.results).not.toEqual([]);
});

test('returns a filled object of anime data', async () => {
  const zoro = new ANIME.Zoro();
  const res = await zoro.search('Overlord IV');
  const data = await zoro.fetchAnimeInfo(res.results[3].id); // Overlord IV id
  expect(data).not.toBeNull();
  expect(data.description).not.toBeNull();
  expect(data.episodes).not.toEqual([]);
});

test('returns a filled object of episode sources', async () => {
  const zoro = new ANIME.Zoro();
  const res = await zoro.search('Overlord IV');
  const info = await zoro.fetchAnimeInfo(res.results[3].id);
  const data = await zoro.fetchEpisodeSources(info.episodes![0].id); // Overlord IV episode 1 id
  expect(data.sources).not.toEqual([]);
});
