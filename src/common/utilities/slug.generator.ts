import slugify from 'slugify';
const slug = require('unique-slug');

export function generateUniqueSlug(
  toSlugify: string,
  options: {
    addRandom?: boolean;
    separator?: string;
    slugifyOptions?: string;
  } = {},
): string {
  const {
    addRandom = true,
    separator = '-',
    slugifyOptions = {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    },
  } = options;

  let baseSlug = slugify(toSlugify, slugifyOptions);

  baseSlug = baseSlug.split(':').join('');

  return addRandom ? `${baseSlug}${separator}${slug()}` : baseSlug;
}
