const emojisGenres = {
  Drama: '🎭',
  Acción: '🔫',
  Terror: '☠️',
  Thriller: '😱',
  Animación: '🦄',
  Aventuras: '🤠',
  Aventura: '🤠',
  Biografia: '✍️',
  Comedia: '😂',
  Policial: '👮‍',
  Crimen: '👮‍',
  Fantasía: '🌈',
  Festival: '🎪',
  Familiar: '👪',
};

const emojifier = (genre) => emojisGenres[genre] || '';

export default emojifier;
