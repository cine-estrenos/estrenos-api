import clean from 'get-clean-string';

const emojisGenres = {
  Drama: '🎭',
  Guerra: '🔫',
  Acción: '🔫',
  Bélica: '🔫',
  Terror: '☠️',
  Horror: '☠️',
  Misterio: '👻',
  Romance: '❤️',
  Thriller: '🧟‍♂️',
  Suspenso: '😱',
  Animación: '🦄',
  Aventura: '🤠',
  Western: '🤠',
  Biografia: '✍️',
  Comedia: '😂',
  Policial: '👮‍',
  Crimen: '👮‍',
  Fantasía: '🌈',
  Festival: '🎪',
  Familiar: '👪',
  Musical: '🎵',
  'Ciencia Ficción': '👽',
  Infantil: '👶',
  Historia: '🗿',
  Documental: '🗺️',
  'Película de TV': '📺',
};

const emojifier = (genre) => {
  const parsedGenre = clean()(genre);

  const key = Object.keys(emojisGenres).find((emojiGenre) => {
    const parsedEmojiGenre = clean()(emojiGenre.slice(0, 3));
    return parsedGenre.includes(parsedEmojiGenre);
  });

  const emojiGenre = emojisGenres[key];
  if (!emojiGenre) console.log(`Emoji for genre ${genre} not found`); // eslint-disable-line no-console

  return emojiGenre || '';
};

export default emojifier;
