const fetchProducts = async (query) => {
  if (!query) throw new Error('You must provide an url');
  const api = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const resp = await fetch(api).then((res) => res.json()).then((res) => res.results);
  return resp;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
