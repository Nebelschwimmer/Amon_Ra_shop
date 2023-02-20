const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
      'content-type': 'application/json',
      Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VlMjEyYjU5Yjk4YjAzOGY3N2I2OTEiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2NTUwNDgzLCJleHAiOjE3MDgwODY0ODN9.70Yng20WU26tGSj7XriIHcZpHjDc2tj-B_eNi5MmPbc",
    },
  };
  
  const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject('Error');
  };
  
  class Api {
    // {baseUrl, headers}
    constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers;
    }
    getProductList(page = 3) {
      return fetch(`${this._baseUrl}/products?page=${page}`, {
        headers: this._headers,
      }).then((res) => onResponse(res));
    }
    getProductById(id) {
      return fetch(`${this._baseUrl}/products/${id}`, {
        headers: this._headers,
      }).then((res) => onResponse(res));}
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then((res) => onResponse(res));
      
    }
    searchProducts(query) {
      return fetch(`${this._baseUrl}/products/search?query=${query}`, {
        headers: this._headers,
      }).then((res) => onResponse(res));
    }
    // like - true / false
    changeLikeProductStatus(productId, like) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        headers: this._headers,
        method: like ? 'PUT' : 'DELETE',
      }).then((res) => onResponse(res));
    }
    deleteLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        headers: this._headers,
        method: 'DELETE'
      }).then((res) => onResponse(res));
    }
    addLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        headers: this._headers,
        method: 'PUT'
      }).then((res) => onResponse(res));

    }
      addProduct(data) {
      return fetch(`${this._baseUrl}/products`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          
          "name": "Бастет, статуэтка",
          "price": 760,
          "discount": 0,
          "wight": "100 г",
          "description": "Стоящая",
          "available": true,
          "stock": 10,
          "pictures": "https://perstni.com/wp-content/uploads/2016/01/cs619422.vk_.me_1.jpg"  
           }),
        }).then((res) => onResponse(res)); 
       }  
    
     changeUserInfo() {
      return fetch(`${this._baseUrl}products/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: 'Nebelscwimmer',
        about: 'Администратор'
      })
    });
  }
  }

      
       

  
  export const api = new Api(config);