import { observable, action } from 'mobx';
import { Auth, Hub } from 'aws-amplify';

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable currentUser;
  @observable isSpinning;

  constructor(root) {
    this.rootState = root;
    this.authenticated = false;
    this.authenticating = false;
    this.currentUser = null;
    this.isSpinning = false;
    Hub.listen('auth', (data) => {
      this.onAuthEvent(data.payload);
    });
    this.getCurrentUser();
  }

  get userId() {
    if (!this.currentUser) return null;
    return this.currentUser.username; // cognito username
  }

  get email() {
    if (!this.currentUser || !this.currentUser.attributes) return null;
    return this.currentUser.attributes.email;
  }

  @action
  startSpinner() {
    this.isSpinning = true;
  }

  @action
  stopSpinner() {
    this.isSpinning = false;
  }

  onAuthEvent(payload) {
    this.getCurrentUser();
  }

  @action
  getCurrentUser() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.currentUser = user;
        this.authenticated = true;
      })
      .catch(() => {
        this.currentUser = null;
        this.authenticated = false;
      });
  }

  @action.bound
  signOut() {
    Auth.signOut();
    this.authenticated = false;
    this.currentUser = null;
  }

  //   async fetchData(pathname, id) {
  //     let { data } = await axios.get(
  //       `https://jsonplaceholder.typicode.com${pathname}`
  //     );
  //     console.log(data);
  //     data.length > 0 ? this.setData(data) : this.setSingle(data);
  //   }

  //   @action setData(data) {
  //     this.items = data;
  //   }

  //   @action setSingle(data) {
  //     this.item = data;
  //   }

  //   @action clearItems() {
  //     this.items = [];
  //     this.item = {};
  //   }

  //   @action authenticate() {
  //     return new Promise((resolve, reject) => {
  //       this.authenticating = true;
  //       setTimeout(() => {
  //         this.authenticated = !this.authenticated;
  //         this.authenticating = false;
  //         resolve(this.authenticated);
  //       }, 0);
  //     });
  //   }
}
