// Mocks
import { LocalStorage } from './mocks/localStorage';
import { fetch } from './mocks/fetch';

global.fetch = fetch;
global.localStorage = new LocalStorage();
