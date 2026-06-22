const POSTER_MAP = {
  inception: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6d.jpg',
  'spirited away': 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuFiC.jpg',
  'dune: part two': 'https://image.tmdb.org/t/p/w500/1bwx55zbcfPmYtaQQHlZuP8i6s2.jpg',
  'dune part two': 'https://image.tmdb.org/t/p/w500/1bwx55zbcfPmYtaQQHlZuP8i6s2.jpg',
}

export function getPosterUrl(title, customUrl = '') {
  if (customUrl?.trim()) return customUrl.trim()

  const key = title.trim().toLowerCase()
  if (POSTER_MAP[key]) return POSTER_MAP[key]

  const encoded = encodeURIComponent(title.trim() || 'Film')
  return `https://placehold.co/120x180/1e1b4b/7c3aed?text=${encoded}`
}
