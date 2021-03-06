class JWT {
  constructor() {
    this.storageKey = 'ACCESS_TOKEN';
    this.refresh_ttl = 20160;
  }
  //payload getter
  getPayload() {
    let rawToken = localStorage.getItem(this.storageKey);
    if (rawToken == null)
      return null;
    let payload = rawToken.split('.')[1];
    return JSON.parse(window.atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  }
  //header getter
  getHeader() {
    let rawToken = localStorage.getItem(this.storageKey);
    if (rawToken == null)
      return null;
    let header = rawToken.split('.')[0];
    return JSON.parse(window.atob(header.replace(/-/g, '+').replace(/_/g, '/')));
  }
  //check if admin or not
  isAdmin(){
    const data = this.getPayload();
    return data.admin == 1;
  }
  // save token in the localstorage
  saveToken(token) {
    localStorage.setItem(this.storageKey, token);
  }
  // retrieve token from localstorage 
  getToken() {
    return localStorage.getItem(this.storageKey);
  }
  // retrieve token to set request headers
  getTokenAuthorization() {
    return 'Bearer ' + this.getToken();
  }
  //remove all token details during logout
  deleteToken() {
    localStorage.removeItem(this.storageKey);
  }
  //return true if the token already expired on client
  isExpiredOnClient() {
    let payload = this.getPayload();
    return payload['exp'] < Math.round((new Date()).getTime() / 1000);
  }
  //return true if the token already expired on server
  isExpiredOnServer() {
    let payload = this.getPayload();
    return (payload['iat'] + this.refresh_ttl) < Math.round((new Date()).getTime() / 1000);
  }
  //return true only if the user is authenticated
  isAuthenticated() {
    if (localStorage.getItem(this.storageKey) != null) {
      return this.isExpiredOnClient() ? false : true;
    }
    return false;
  }
}

const jwt = new JWT;
export default jwt;