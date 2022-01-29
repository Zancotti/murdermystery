import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeDispatch } from 'components/Article';
import axios from 'axios';

export const useAuthenticatedFetch = (url, getSelector, action) => {
  const dataList = useSelector(getSelector);
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
        dispatch(action(res.data));
      });
  }, [url, dispatch, accessToken, action]);

  return dataList;
};
