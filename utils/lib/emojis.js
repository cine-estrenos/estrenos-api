const emojisGenres = {
  Drama: '🎭',
  Acción: '🔫',
  Bélica: '🔫',
  Terror: '☠️',
  Misterio: '👻',
  Romance: '❤️',
  Thriller: '😱',
  Suspense: '😱',
  Animación: '🦄',
  Aventuras: '🤠',
  Aventura: '🤠',
  Western: '🤠',
  Biografia: '✍️',
  Comedia: '😂',
  Policial: '👮‍',
  Crimen: '👮‍',
  Fantasía: '🌈',
  Festival: '🎪',
  Familiar: '👪',
  Familia: '👪',
  Musical: '🎵',
  Música: '🎵',
  'Ciencia Ficción': '👽',
  'Ciencia ficción': '👽',
  Infantil: '👶',
  Historia: '🗿',
  Documental: '🗺️',
  'Película de TV': '📺',
};

const emojifier = (genre) => {
  const emojiGenre = emojisGenres[genre];
  if (!emojiGenre) console.log(`Emoji for genre ${genre} not found`); // eslint-disable-line no-console

  return emojiGenre || '';
};

export default emojifier;
