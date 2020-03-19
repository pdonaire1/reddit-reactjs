import * as mobx from 'mobx';
const store = require('store')

export default function(_this: any) {
  let firstRun = true

  // will run on change
  mobx.autorun(() => {
    // on load check if there's an existing store on localStorage and extend the store
    if (firstRun) {
      const existingStore = store.get("store")
      
      if (existingStore) {
        mobx.extendObservable(_this, existingStore)
      }
    }

    // from then on serialize and save to localStorage
    store.set("store", mobx.toJS(_this))
  })

  firstRun = false
}