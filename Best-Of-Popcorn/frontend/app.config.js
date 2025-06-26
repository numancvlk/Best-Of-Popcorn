export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      API_URL: process.env.API_URL,
    },
  };
};
