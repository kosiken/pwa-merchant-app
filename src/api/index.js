import axios from 'axios';

function goodResponse(resp) {
  let val = resp.status === 200 || resp.status === 201;
  return val;
}

class FiveChowError extends Error {
  constructor(resp) {
    super();
    this.data = resp.data;
    this.status = resp.status;
  }
}

let prod = false;

const Axios = axios.create({
  baseURL:
    (prod ? 'https://api.500chow.com' : 'http://127.0.0.1:8000') + '/api/',
  headers: { 'Content-Type': 'application/json' },
});

class FiveApi {
  /**
   *
   * @param {AxiosInstance} api
   */
  constructor(api) {
    this.api = api;
  }

  /**
   *
   * @param {{username: string, password: string}} user
   */
  async login(user) {
    try {
      let resp = await this.api.post('/vendors/login/', user);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      throw new FiveChowError({
        data: {
          error: err.message,
          code: 5010,
        },
      });
    }
  }

  async register(user) {
    try {
      let resp = await this.api.post('/vendors/login/', user);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      throw new FiveChowError({
        data: {
          error: err.message,
          code: 5010,
        },
      });
    }
  }
}

export default new FiveApi(Axios);
