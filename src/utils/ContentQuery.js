export const contentQuery = (query, variable, locale) => {
  return JSON.stringify({
    query: query.replace("locale-key", locale),
    variables: variable,
  });
};