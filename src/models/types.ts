export type MemeType = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  // eslint-disable-next-line camelcase
  box_count: number;
};

export type MemeProps = {
  meme: MemeType;
  onClick: (meme: MemeType) => void;
};

export interface TextValue {
  top: string;
  bottom: string;
}
