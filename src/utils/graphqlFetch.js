const contentfulFetch = async (graphql) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer xOBbRGVg2nSpGvMr4pCe8yde1QRd7QXJsRt79FvpHGc"
  );

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };
  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/g0vlktv79bhz",
    requestOptions
  );
  const result = await response.json();
  return result.data;
};

export default contentfulFetch;
