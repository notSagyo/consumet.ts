import axios from 'axios';
import { load } from 'cheerio';
import WebSocket from 'ws';

import { VideoExtractor, IVideo, ISubtitle, Intro } from '../../models';
import { USER_AGENT } from '..';

class RapidCloud extends VideoExtractor {
  protected override serverName = 'RapidCloud';
  protected override sources: IVideo[] = [];

  private readonly host = 'https://rapid-cloud.ru';
  private readonly enimeApi = 'https://api.enime.moe';

  override extract = async (videoUrl: URL): Promise<{ sources: IVideo[] } & { subtitles: ISubtitle[] }> => {
    const result: { sources: IVideo[]; subtitles: ISubtitle[]; intro?: Intro } = {
      sources: [],
      subtitles: [],
    };
    try {
      const id = videoUrl.href.split('/').pop()?.split('?')[0];
      const options = {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Referer: videoUrl.href,
          'User-Agent': USER_AGENT,
        },
      };

      let res = null;
      const { data } = await axios.get(videoUrl.href, options);
      const html = load(data).html();
      const key = html
        .substring(html.indexOf('var recaptchaSiteKey ='), html.lastIndexOf(',')!)
        .split(' = ')[1]
        .replace(/\'/g, '');
      const _number = html
        .substring(html.indexOf('recaptchaNumber ='), html.lastIndexOf(';')!)
        .split(' = ')[1]
        .replace(/\'/g, '');

      const { data: sId } = await axios.get(`${this.enimeApi}/tool/rapid-cloud/server-id`);

      const _token = await this.captcha(videoUrl.href, key);

      res = await axios.get(
        `${this.host}/ajax/embed-6/getSources?id=${id}&sId=${sId}&_number=${_number}&_token=${_token}`,
        options
      );

      const {
        data: { sources, tracks, intro },
      } = res;

      this.sources = sources.map((s: any) => ({
        url: s.file,
        isM3U8: s.file.includes('.m3u8'),
      }));

      result.sources.push(...this.sources);

      if (videoUrl.href.includes(new URL(this.host).host)) {
        result.sources = [];
        this.sources = [];
        for (const source of sources) {
          const { data } = await axios.get(source.file, options);
          const m3u8data = data
            .split('\n')
            .filter((line: string) => line.includes('.m3u8') && line.includes('RESOLUTION='));
          const secondHalf = m3u8data.map((line: string) =>
            line.match(/(?<=RESOLUTION=).*(?<=,C)|(?<=URI=).*/g)
          );

          const TdArray = secondHalf.map((s: string[]) => {
            const f1 = s[0].split(',C')[0];
            const f2 = s[1].replace(/"/g, '');

            return [f1, f2];
          });
          for (const [f1, f2] of TdArray) {
            this.sources.push({
              url: `${source.file?.split('master.m3u8')[0]}${f2.replace('iframes', 'index')}`,
              quality: f1.split('x')[1] + 'p',
              isM3U8: f2.includes('.m3u8'),
            });
          }
          result.sources.push(...this.sources);
        }
        if (intro.end > 1) {
          result.intro = {
            start: intro.start,
            end: intro.end,
          };
        }
      }

      result.sources.push({
        url: sources[0].file,
        isM3U8: sources[0].file.includes('.m3u8'),
        quality: 'auto',
      });

      result.subtitles = tracks.map((s: any) => ({
        url: s.file,
        lang: s.label ? s.label : 'Default (maybe)',
      }));

      return result;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  private captcha = async (url: string, key: string): Promise<string> => {
    const uri = new URL(url);
    const domain = uri.protocol + '//' + uri.host;

    const { data } = await axios.get(`https://www.google.com/recaptcha/api.js?render=${key}`, {
      headers: {
        Referer: domain,
      },
    });

    const v = data
      ?.substring(data.indexOf('/releases/'), data.lastIndexOf('/recaptcha'))
      .split('/releases/')[1];

    //TODO: NEED to fix the co (domain) parameter to work with every domain
    const anchor = `https://www.google.com/recaptcha/api2/anchor?ar=1&hl=en&size=invisible&cb=kr42069kr&k=${key}&co=aHR0cHM6Ly9yYXBpZC1jbG91ZC5ydTo0NDM.&v=${v}`;
    const c = load((await axios.get(anchor)).data)('#recaptcha-token').attr('value');

    // currently its not returning proper response. not sure why
    const res = await axios.post(
      `https://www.google.com/recaptcha/api2/reload?k=${key}`,
      {
        v: v,
        k: key,
        c: c,
        co: 'aHR0cHM6Ly9yYXBpZC1jbG91ZC5ydTo0NDM.',
        sa: '',
        reason: 'q',
      },
      {
        headers: {
          Referer: anchor,
        },
      }
    );

    return res.data.substring(res.data.indexOf('rresp","'), res.data.lastIndexOf('",null'));
  };

  // private wss = async (): Promise<string> => {
  //   let sId = '';

  //   const ws = new WebSocket('wss://ws1.rapid-cloud.ru/socket.io/?EIO=4&transport=websocket');

  //   ws.on('open', () => {
  //     ws.send('40');
  //   });

  //   return await new Promise((resolve, reject) => {
  //     ws.on('message', (data: string) => {
  //       data = data.toString();
  //       if (data?.startsWith('40')) {
  //         sId = JSON.parse(data.split('40')[1]).sid;
  //         ws.close(4969, "I'm a teapot");
  //         resolve(sId);
  //       }
  //     });
  //   });
  // };
}

export default RapidCloud;
