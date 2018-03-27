import React from 'react';
import { Icon } from '../icons';

const Looks5Path = () => [
  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h2c1.1 0 2 .89 2 2v2c0 1.11-.9 2-2 2H9v-2h4v-2H9V7h6v2z" key='path0' />,
];

const Looks5Icon = Icon.extend.attrs({
  children: Looks5Path,
})``;

export default Looks5Path;
export { Looks5Icon };