import React, { useState, useEffect } from 'react';
import { MemeType, TextValue } from '../models/types';
import objectToQueryParam from '../helpers/queryString';

import Meme from './Meme';

import style from './MemeList.module.css';

const MemeList = (): JSX.Element => {
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [currentMeme, setCurrentMeme] = useState<MemeType>({
    id: '',
    name: '',
    url: '',
    width: 0,
    height: 0,
    box_count: 0,
  });
  const [createdMeme, setCreatedMeme] = useState<string>('');
  const [text, setText] = useState<TextValue>({ top: '', bottom: '' });

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then((res) =>
      res.json().then(({ data }) => setMemes(data.memes)),
    );
  }, []);

  const selectMeme = (meme: MemeType): void => {
    setCurrentMeme(
      currentMeme.id
        ? {
            id: '',
            name: '',
            url: '',
            width: 0,
            height: 0,
            box_count: 0,
          }
        : meme,
    );
    setText({ top: '', bottom: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    setText({ ...text, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const params = {
      template_id: currentMeme.id,
      text0: text.top,
      text1: text.bottom,
      username: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD,
    };
    const response = await fetch(
      `https://api.imgflip.com/caption_image${objectToQueryParam(params)}`,
    );

    const {
      data: { url },
    } = await response.json();
    setCreatedMeme(url);
  };

  if (createdMeme) {
    return (
      <div style={{ textAlign: 'center', width: '200px' }}>
        <img src={createdMeme} alt="my custom meme" />
      </div>
    );
  }
  return (
    <div className={style.container}>
      {currentMeme.id ? (
        <form onSubmit={handleSubmit}>
          <Meme key={currentMeme.id} meme={currentMeme} onClick={selectMeme} />
          <input
            type="text"
            placeholder="top text"
            name="top"
            value={text.top}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="bottom text"
            name="bottom"
            value={text.bottom}
            onChange={handleChange}
          />
          <button type="submit">Create meme</button>
        </form>
      ) : (
        <>
          <h1>Pick a meme</h1>
          {memes.map((meme) => {
            return <Meme key={meme.id} meme={meme} onClick={selectMeme} />;
          })}
        </>
      )}
    </div>
  );
};

export default MemeList;
