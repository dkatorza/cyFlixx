import { proxy } from 'valtio';

const notFoundState = proxy({
  is404: false,
});

export default notFoundState;
