import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSafeDispatch } from 'hooks';
import axios from 'axios';

export const useAuthenticatedFetch = (url, getSelector, action) => {
  const dataList = useSelector(getSelector);
  const [error, setError] = useState(null);
  const dispatch = useSafeDispatch();
  const { accessToken } = useSelector(state => state.user.user);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(res => {
        if (dataList && dataList.length > 0) return;
        if (res.data.success) {
          dispatch(action(res.data.content));
        }
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, [url, dispatch, accessToken, action, dataList]);

  return { dataList, error };
};
