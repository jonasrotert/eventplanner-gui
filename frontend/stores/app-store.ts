import { makeAutoObservable } from 'mobx';
import {ContactStore} from "Frontend/stores/contact-store";
import {UiStore} from "Frontend/stores/ui-store";

export class AppStore {

  contactStore = new ContactStore();
  uiStore = new UiStore();

  constructor() {
    makeAutoObservable(this);
  }
}

export const appStore = new AppStore();
export const contactStore = appStore.contactStore;
export const uiStore = appStore.uiStore;