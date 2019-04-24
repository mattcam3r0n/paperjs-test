import { observable, action } from 'mobx';
import { Auth, Hub, API } from 'aws-amplify';
import { merge } from 'lodash';

const dialogNames = {
  NEW_DRILL: 'newDrillDialog',
  CONFIRM: 'confirmDialog',
};

export default class AppState {
  @observable authenticated;
  @observable authenticating;
  @observable currentUser;
  @observable isSpinning;
  @observable activeDialogName;
  @observable dialogOptions;
  @observable isAlertOpen;
  @observable alertMessage;

  constructor(root) {
    this.rootState = root;
    this.authenticated = false;
    this.authenticating = false;
    this.currentUser = null;
    this.isSpinning = false;
    this.isAlertOpen = false;
    this.isNewDrillDialogOpen = false;
    this.activeDialogName = null;
    this.dialogOptions = {};
    Hub.listen('auth', (data) => {
      this.onAuthEvent(data.payload);
    });
    this.getCurrentUser();
  }

  get DialogNames() {
    return dialogNames;
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

  @action
  openDialog(name, options = {}) {
    this.activeDialogName = name;
    this.dialogOptions = {
      ...options,
    };
    return new Promise((resolve, reject) => {
      this.dialogOptions.resolve = resolve;
      this.dialogOptions.reject = reject;
    });
  }

  @action
  closeDialog(name, result) {
    this.activeDialogName = null;
    this.dialogOptions.resolve(result);
    this.dialogOptions = {};
  }

  isDialogOpen(name) {
    return this.activeDialogName === name;
  }

  @action
  showAlert(options) {
    this.isAlertOpen = true;
    this.alertOptions = merge({}, { variant: 'info', message: '' }, options);
  }

  @action
  closeAlert() {
    this.isAlertOpen = false;
    this.alertOptions = null;
  }

  onAuthEvent(payload) {
    this.getCurrentUser();
  }

  @action
  getCurrentUser() {
    return Auth.currentAuthenticatedUser()
      .then((user) => {
        this.currentUser = user;
        this.authenticated = true;
      })
      .catch(() => {
        this.currentUser = null;
        this.authenticated = false;
      })
      .finally(() => {
        return this.currentUser;
      });
  }

  @action.bound
  signOut() {
    Auth.signOut();
    this.authenticated = false;
    this.currentUser = null;
  }

  log() {
    console.log('log');
    const body = { message: 'test message' };
    API.post('precisionREST', '/logs', { body })
      .then((response) => console.log({ response }))
      .catch((err) => console.log({ err }));
    // API.get('precisionREST', '/logs')
    //   .then((response) => console.log({ response }))
    //   .catch((err) => console.log({ err }));
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
