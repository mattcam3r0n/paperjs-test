import { observable, action } from 'mobx';
import { Auth, Hub } from 'aws-amplify';

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable currentUser;

  constructor(root) {
    this.rootState = root;
    this.authenticated = false;
    this.authenticating = false;
    this.currentUser = null;
    Hub.listen('auth', (data) => {
      this.onAuthEvent(data.payload);
    });
    this.getCurrentUser();
  }

  onAuthEvent(payload) {
    console.log(
      'A new auth event has happened: ',
      payload.data.username + ' has ' + payload.event
    );
    this.getCurrentUser();
  }

  @action
  getCurrentUser() {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.currentUser = user;
      })
      .catch(() => {
        this.currentUser = null;
      });
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
