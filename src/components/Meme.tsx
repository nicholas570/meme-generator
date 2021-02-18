/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { MemeProps } from '../models/types';

import style from './Meme.module.css';

const Meme = ({ meme, onClick }: MemeProps): JSX.Element => {
  return (
    <div className={style.meme}>
      <img
        style={{ width: '200px' }}
        key={meme.id}
        src={meme.url}
        alt={meme.name}
        onClick={(): void => onClick(meme)}
      />
    </div>
  );
};

export default Meme;
