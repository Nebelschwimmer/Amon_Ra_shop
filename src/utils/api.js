const freshHeaders = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
};



const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
      'content-type': 'application/json',
      Authorization:
      localStorage.getItem("token"),
    },
    freshHeaders: freshHeaders,
  };
  
  const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject('Error');
  };
  
  class Api {
    // {baseUrl, headers}
    constructor(data) {
      this._baseUrl = data.baseUrl;
      this._headers = data.headers;
      this._freshHeaders = data.freshHeaders;
    }
    getProductList(limit = 300) {
      return fetch(`${this._baseUrl}/products?limit=${limit}`, {
        headers: this._headers,
      }).then((res) => onResponse(res));
    }
    getProductById(id) {
      return fetch(`${this._baseUrl}/products/${id}`, {
        ...this._freshHeaders(),
      }).then((res) => onResponse(res));}
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        ...this._freshHeaders(),
      }).then((res) => onResponse(res)); 
    }
    getUsers() {
      return fetch(`${this._baseUrl}/users`, {
        ...this._freshHeaders(),
      }).then((res) => onResponse(res));
    }
    updateUserInfo(body) {
      return fetch(`${this._baseUrl}/users/me`, {
        ...this._freshHeaders(),
        method: "PATCH",
        body: JSON.stringify(body),
      }).then((res) => onResponse(res));
    }
    searchProducts(query) {
      return fetch(`${this._baseUrl}/products/search?query=${query}`, {
        ...this._freshHeaders(),
      }).then((res) => onResponse(res));
    }
    deleteLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        ...this._freshHeaders(),
        method: 'DELETE'
      }).then((res) => onResponse(res));
    }
    addLike(productId) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        ...this._freshHeaders(),
        method: 'PUT'
      }).then((res) => onResponse(res));

    }
    addProduct(data) {
      return fetch(`${this._baseUrl}/products`, {
        ...this._freshHeaders(),
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => onResponse(res));
    }
    updateProduct(productId, body) {
      return fetch(`${this._baseUrl}/products/${productId}`, {
        ...this._freshHeaders(),
        method: "PATCH",
        body: JSON.stringify(body),
      }).then((res) => onResponse(res));
    }

    addReview(productId, body) {
      return fetch(`${this._baseUrl}/products/review/${productId}`, {
        ...this._freshHeaders(),
        method: "POST",
        body: JSON.stringify(body)
        }).then((res) => onResponse(res));
      }
      
    deleteReview(productId, reviewId) {
      return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
        ...this._freshHeaders(),
        method: 'DELETE'
      }).then((res) => onResponse(res));
    }
    changeLikeProductStatus(productId, isLiked) {
      return fetch(`${this._baseUrl}/products/likes/${productId}`, {
        ...this._freshHeaders(),
        method: isLiked ? "DELETE" : "PUT",
      }).then((res) => onResponse(res));
    }

  
      changeUserAvatar() {
        return fetch(`${this._baseUrl}/v2/group-10/users/me/avatar`, {
          method: 'PATCH',
          ...this._freshHeaders(),
          body: JSON.stringify({
            avatar: "https://i.pinimg.com/originals/f1/ca/9d/f1ca9daf96bcfddccb7c792b9c8d684e.jpg"  
          })
        });
      }
      updateAvatar(avatar) {
        return fetch(`${this._baseUrl}/v2/group-10/users/me/avatar`, {
          ...this._freshHeaders(),
          method: "PATCH",
          body: JSON.stringify(avatar),
        }).then((res) => onResponse(res));
      }
      
      deleteProductById (productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
          method: 'DELETE',
          ...this._freshHeaders(),
        });  
      }
    }
    
      

  
  export const api = new Api(config);