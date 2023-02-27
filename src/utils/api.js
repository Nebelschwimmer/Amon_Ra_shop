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
    getProductList(page=2) {
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
          "name": "Ра, статуэтка",
		"price": 1430,
		"discount": 5,
		"wight": "600 г",
		"description": "Статуэтка верховного божества египтян - Ра (Амон Ра). Материал: алебастр. Ручная работа.",
		"available": true,
		"stock": 15,
		"pictures": "https://i.pinimg.com/originals/45/e2/e6/45e2e65006da9b3c9fd1699af68c8654.jpg"
         
           }),
        }).then((res) => onResponse(res)); 
       }  
    
     changeUserInfo() {
      return fetch(`${this._baseUrl}/products/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: 'Nebelscwimmer',
        about: 'Администратор'
      })
    });
  }
  
      changeUserAvatar() {
        return fetch(`${this._baseUrl}/v2/group-10/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: "https://i.pinimg.com/originals/f1/ca/9d/f1ca9daf96bcfddccb7c792b9c8d684e.jpg"  
          })
        });
      }
      
      deleteProductById (productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
          method: 'DELETE',
          headers: this._headers,
        });  
      }
      }

      
       

  
  export const api = new Api(config);