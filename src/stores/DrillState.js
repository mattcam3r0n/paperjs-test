import { observable, action } from 'mobx';
import { Storage } from 'aws-amplify';
import shortid from 'shortid';

import { API, graphqlOperation } from 'aws-amplify';
import { createDrill, updateDrill, deleteDrill } from '../graphql/mutations';
import { getDrill, listDrills } from '../graphql/queries';
import BlockBuilder from '../lib/drill/BlockBuilder';

export default class DrillState {
  @observable currentDrill;

  constructor(root) {
    this.rootState = root;
    this.currentDrill = this.createNewDrill();
  }

  get appState() {
    return this.rootState.appState;
  }

  startSpinner = () => {
    this.rootState.appState.startSpinner();
  };

  stopSpinner = () => {
    this.rootState.appState.stopSpinner();
  };

  @action.bound
  async openDrill(drillId) {
    if (!drillId) {
      throw new Error('DrillState.openDrill: you must supply a drill id.');
    }

    try {
      const result = await Storage.get('drills/' + drillId, {
        level: 'protected',
        download: true,
      });
      const drill = JSON.parse(result.Body.toString());
      this.currentDrill = drill;
    } catch (error) {
      console.log('DrillState.openDrill: ', error);
    }
  }

  async getDrillRecord(drillId) {
    if (!drillId) {
      throw new Error('DrillState.getDrillRecord: you must supply a drill id.');
    }
    const result = await API.graphql(
      graphqlOperation(getDrill, {
        id: drillId,
      })
    );
    this.currentDrill = result.data.getDrill;
  }

  @action.bound
  async getUserDrills() {
    const { userId } = this.appState;
    this.startSpinner();
    const result = await API.graphql(
      graphqlOperation(listDrills, {
        filter: {
          userId: {
            eq: userId,
          },
        },
      })
    );
    const drills = result.data.listDrills.items;
    this.stopSpinner();
    return drills;
  }

  @action.bound
  async saveDrill(drill = this.currentDrill) {
    const isNew = !drill.id;
    if (isNew) {
      await this.createDrill(drill);
    } else {
      await this.updateDrill(drill);
    }
  }

  @action.bound
  async deleteDrill(drill) {
    await this.deleteDrillRecord(drill);
    await this.deleteDrillFile(drill);
  }

  async createDrill(drill) {
    // TODO: how to compensate if one operation fails? need to ensure both
    // or none succeed
    try {
      drill.id = shortid.generate();
      drill.ownerEmail = this.appState.email;
      drill.userId = this.appState.userId;
      drill.storageKey = 'drills/' + drill.id;
      drill.createdDate = new Date();
      drill.updatedDate = new Date();
      await this.putDrillFile(drill);
      await this.createDrillRecord(drill);
    } catch (err) {
      return console.log(err);
    }
  }

  async updateDrill(drill) {
    // TODO: how to compensate if one operation fails? need to ensure both
    // or none succeed
    try {
      drill.updatedDate = new Date();
      await this.putDrillFile(drill);
      await this.updateDrillRecord(drill);
    } catch (err) {
      return console.log(err);
    }
  }

  async deleteDrillFile(drill) {
    const result = await Storage.remove(drill.storageKey, {
      level: 'protected',
    });
    console.log('deleteDrillFile: ', result);
    return result;
  }

  async deleteDrillRecord(drill) {
    const result = await API.graphql(
      graphqlOperation(deleteDrill, {
        input: {
          id: drill.id,
        },
      })
    );
    console.log('deleteDrillRecord: ', result);
    return result;
  }

  async putDrillFile(drill) {
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
    console.log('drill file successfully created', result);
  }

  async createDrillRecord(drill) {
    const drillRecord = {
      id: drill.id,
      name: drill.name || 'New Drill',
      description: drill.description ? drill.description : null, // dynamodb doesn't like empty strings
      ownerEmail: drill.ownerEmail,
      userId: drill.userId,
      storageKey: drill.storageKey,
      createdDate: drill.createdDate,
      updatedDate: drill.updatedDate,
    };
    const result = await API.graphql(
      graphqlOperation(createDrill, { input: drillRecord })
    );
    console.log('drill record successfully created', drillRecord, result);
  }

  async updateDrillRecord(drill) {
    const drillRecord = {
      id: drill.id,
      name: drill.name,
      description: drill.description,
      ownerEmail: drill.ownerEmail,
      userId: drill.userId,
      storageKey: drill.storageKey,
      createdDate: drill.createdDate,
      updatedDate: drill.updatedDate,
    };
    const result = await API.graphql(
      graphqlOperation(updateDrill, { input: drillRecord })
    );
    console.log('drill record successfully updated', result);
  }

  @action.bound
  newDrill(options = { name: 'New Drill', description: '' }) {
    const x = Math.floor(Math.random() * 100);
    const y = 6; //Math.floor(Math.random() * 100);
    const newDrill = this.createNewDrill({
      x: x,
      y: y,
      name: options.name,
      description: options.description,
    });
    this.currentDrill = newDrill;
    return Promise.resolve(newDrill);
  }

  // temporary helper
  createNewDrill(options = { x: 6, y: 6, name: 'New Drill', decription: '' }) {
    const drill = {
      name: options.name,
      description: options.description,
    };
    const block = new BlockBuilder()
      .createBlock({
        files: 7,
        ranks: 33,
        initialState: {
          position: {
            x: options.x,
            y: options.y,
          },
        },
      })
      .build();
    drill.marchers = block;
    return drill;
  }
}
