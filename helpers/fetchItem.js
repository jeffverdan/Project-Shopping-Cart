const fetchItem = async (query) => {    
  try {
    const api = `https://api.mercadolibre.com/items/${query}`;
    const res = await (await fetch(api)).json();
    return res;
  } catch (e) {
    throw new Error('You must provide an url');
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
