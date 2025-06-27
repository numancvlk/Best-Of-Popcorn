export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      API_URL: process.env.API_URL,
      TMDB_POSTER: process.env.TMDB_POSTER,
      TMDB_BACKDROP: process.env.TMDB_BACKDROP,
    },
  };
};
