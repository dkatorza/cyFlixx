import { proxy } from 'valtio';

const queryState = proxy({
  criteria: 'title',
  query: '',
});

export default queryState;
