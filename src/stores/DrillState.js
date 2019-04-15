import { observable, action } from 'mobx';
import { Storage } from 'aws-amplify';

export default class DrillState {
  @observable currentDrill;

  constructor(root) {
    this.rootState = root;
    this.currentDrill = null;
  }

  @action
  openDrill(key) {
    // set currentDrill
  }

  saveDrill() {
    // TODO: need a way to guarantee unique name
    // NO LEADING SLASH! or it will create a folder with {no name}/drills/file.json
    return Storage.put('drills/test.txt', 'Protected Content', {
        level: 'protected',
        contentType: 'text/plain'
    })
    .then (result => console.log(result))
    .catch(err => console.log(err));    
  }

}
