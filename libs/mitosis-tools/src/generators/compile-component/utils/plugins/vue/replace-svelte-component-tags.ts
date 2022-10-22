import * as cheerio from 'cheerio';

export const replaceSvelteComponentTags = (doc: string) => {
  console.log(doc);
  const $ = cheerio.load(doc, null, false);

  $('[this]').each((i, item) => {
    item.tagName = item.attribs['this'].replace('{', '').replace('}','');
    delete item.attribs['this'];
  });

  return $.html().toString();
}
