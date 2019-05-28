let api = process.env.VUE_APP_API_URL;
if (!api) {
  api = "https://bfh-proj1-backend.herokuapp.com"
}

export default {
  api: api,
  defaultQuery: "select * from block;"
};
