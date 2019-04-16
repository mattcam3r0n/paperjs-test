import { observable, action } from 'mobx';
import { Storage } from 'aws-amplify';
import shortid from 'shortid';

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
    // drill object should have
    // - id (generated)
    // - name (user friendly drill name)
    // - storageKey (just use id?) - would be nice to have name but if name changes new object is created
    const id = shortid.generate();
    // NO LEADING SLASH! or it will create a folder with {no name}/drills/file.json
    return Storage.put('drills/test-' + id, 'Protected Content', {
        level: 'protected',
        contentType: 'text/plain',
        metadata: {
            id: id
        }
    })
    .then (result => console.log(result))
    .catch(err => console.log(err));    
  }

}
