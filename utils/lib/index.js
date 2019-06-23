const emojisGenres = {
  Drama: '🎭',
  Acción: '💥',
  Terror: '☠️',
  Thriller: '😱',
  Animación: '🦄',
  Aventuras: '🤠',
  Biografia: '✍️',
  Comedia: '😂',
  Policial: '👮‍',
}

const emojifier = category => emojisGenres[category] || ''

module.exports = { emojifier }
