const SearchService = {
    addSearchCategory: ({courseUrl, payloadData}) => {
      return fetch(courseUrl, payloadData);
    },
  };
  
  const { addSearchCategory } = SearchService;
  
  export { addSearchCategory };
  