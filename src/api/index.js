import axios from 'axios';
import Server from './beta';

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

let prod = process.env.NODE_ENV !== 'development';
const Axios = axios.create({
  baseURL: prod ? 'https://api.500chow.com' : 'http://127.0.0.1:3000',
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
        localStorage.setItem('token', resp.data.token);
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async register(user) {
    try {
      let resp = await this.api.post('/vendors/register/', user);

      if (goodResponse(resp)) {
        localStorage.setItem('token', resp.data.token);
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async getCustomers() {
    try {
      let resp = await Server.get('/vendors/customers');

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async getOrders() {
    try {
      let resp = await Server.get('/vendors/orders');

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async getOrder(id) {
    try {
      let resp = await Server.get('/vendors/order/' + id);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async getAddresses() {
    try {
      let resp = await Server.get('/address');

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async getFoods() {
    try {
      let resp = await Server.get('/vendors/food_items');

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }
  async getMe() {
    try {
      let resp = await Server.get('/vendors/me');

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async getCards() {
    try {
      let resp = await Server.get('/cards');

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }
  async getMeals() {
    try {
      let resp = await Server.get('/vendors/meals');

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async createFood(food) {
    try {
      let resp = await Server.post('/vendors/food_item/', food);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }
  async createFoods(foods) {
    try {
      let requests = foods.map((food) =>
        Server.post('/vendors/food_item/', food)
      );
      let resp = await axios.all(requests);

      return resp.map((res) => res.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async createOrder(order) {
    try {
      let resp = await Server.post('/vendors/order/', order);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async createMeal(meal) {
    try {
      let resp = await Server.post('/vendors/meal/', meal);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async createCustomer(customer) {
    try {
      let resp = await Server.post('/vendors/customer/', customer);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async editCustomer(customer) {
    try {
      let resp = await this.api.put('/vendors/customer', customer);

      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async searchPlaces(searchString) {
    try {
      let resp = await axios.get(
        'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
        {
          params: {
            input: searchString,
            key: 'AIzaSyCDRINRTtuQGCi8P7V8lYPcJkuYW5HIKJA',
            inputtype: 'textquery',
            fields: 'formatted_address,name',
          },
        }
      );
      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }

  async editModel(model) {
    console.log(model);
    let resp = await Server.post('/vendors/edit/', model);
    try {
      if (goodResponse(resp)) {
        return resp.data;
      } else {
        throw new FiveChowError(resp);
      }
    } catch (err) {
      if (err.response) {
        throw new FiveChowError(err.response);
      } else {
        throw new FiveChowError({
          data: {
            error: err.message,
            code: 5010,
          },
          status: 0,
        });
      }
    }
  }
}

export default new FiveApi(Axios);
