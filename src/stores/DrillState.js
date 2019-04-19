import { observable, action } from 'mobx';
import { Storage } from 'aws-amplify';
import shortid from 'shortid';

import { API, graphqlOperation } from 'aws-amplify';
import { createDrill } from '../graphql/mutations';
import { getDrill, listDrills } from '../graphql/queries';

export default class DrillState {
  @observable currentDrill;

  constructor(root) {
    this.rootState = root;
    this.currentDrill = null;
  }

  startSpinner = () => {
    this.rootState.appState.startSpinner();
  }

  stopSpinner = () => {
    this.rootState.appState.stopSpinner();
  }

  @action.bound
  async openDrill(drillId) {
    if (!drillId) {
      throw new Error('DrillState.openDrill: you must supply a drill id.');
    }

    const result = await API.graphql(
      graphqlOperation(getDrill, {
        id: drillId
      })
    );
    this.currentDrill = result.data.getDrill;
    console.log('currentDrill', this.currentDrill);
  }

  @action.bound
  async getUserDrills() {
    this.startSpinner();
    const result = await API.graphql(
      graphqlOperation(listDrills, {
        filter: {
          userId: {
            eq: '1',
          },
        },
      })
    );
    console.log(result.data.listDrills.items);
    this.stopSpinner();
  }

  @action.bound
  async saveDrill(drill) {
    const id = shortid.generate();
    // TEMP
    drill = {
      id: id,
      name: 'test drill',
      ownerEmail: 'test@test.com',
      userId: 1,
      storageKey: 'drills/' + id,
    };
    return await this.createDrill(drill);
  }

  async createDrill(drill) {
    // Merge with saveDrill()?
    // TODO: how to compensate if one operation fails? need to ensure both
    // or none succeed
    try {
      await this.createDrillFile(drill);
      await this.createDrillRecord(drill);
    } catch (err) {
      return console.log(err);
    }
  }

  async createDrillFile(drill) {
    const result = await Storage.put(
      'drills/' + drill.id,
      JSON.stringify(drill),
      {
        level: 'protected',
        contentType: 'application/json',
        metadata: {
          id: drill.id,
        },
      }
    );
    console.log('drill file successfully created');
  }

  async createDrillRecord(drill) {
    const drillRecord = {
      id: drill.id,
      name: drill.name,
      description: drill.description,
      ownerEmail: drill.ownerEmail,
      userId: drill.userId,
      storageKey: 'drills/' + drill.id,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    await API.graphql(graphqlOperation(createDrill, { input: drillRecord }));
    console.log('drill record successfully created');
  }
}
