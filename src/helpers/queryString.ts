type params = {
  // eslint-disable-next-line camelcase
  template_id: string;
  text0: string;
  text1: string;
  username: string | undefined;
  password: string | undefined;
};

const objectToQueryParam = (obj: params): string => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return `?${params.join('&')}`;
};

export default objectToQueryParam;
