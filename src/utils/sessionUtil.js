export default {
  saveUser: function (user) {
    localStorage.setItem("login_userInfo", JSON.stringify(user));
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem("login_userInfo"));
  }
}
