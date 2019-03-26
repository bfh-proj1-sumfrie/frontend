let api = process.env.API_URL;
console.log(api)
if (!api) {
  api = "https://bfh-proj1-backend.herokuapp.com"
}

export default {
  api: api
};
