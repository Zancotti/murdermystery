import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeDispatch } from 'hooks';
import axios from 'axios';

export const useAuthenticatedFetch = (url, getSelector, action) => {
  const dataList = useSelector(getSelector);
  const [error, setError] = useState(null);
  const unsafeDispatch = useDispatch();
  const dispatch = useSafeDispatch(unsafeDispatch);
  const { accessToken } = useSelector(state => state.user.user);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(res => {
        console.log('res', res);
        if (dataList && dataList.length > 0) return;
        dispatch(action(res.data));
      })
      .catch(error => {
        console.log(error);
        setError(error);
      });
  }, [url, dispatch, accessToken, action, dataList]);

  console.log('datalist', dataList);

  return { dataList, error };
};
