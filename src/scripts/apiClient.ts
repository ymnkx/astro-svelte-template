type Props = {
  url: string;
  callback: (data: [] | Array<any>) => void;
};

export const apiClient = () => {
  return {
    init: (props: Props) => {
      const { url, callback } = props;

      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`リクエスト失敗:${response.status} ${response.statusText}`);
          }
        })
        .then((data) => {
          callback(data);
        })
        .catch((error) => {
          console.log('ERR: ' + error);
        });
    },
  };
};
