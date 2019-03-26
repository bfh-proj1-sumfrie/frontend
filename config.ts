let api = process.env.API_URL;

if (!api) {
  api = "https://bfh-proj1-backend.herokuapp.com"
}

export default {
  api: api
};
