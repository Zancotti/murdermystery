import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/loading.json';
import { useMediaQuery } from 'react-responsive';

// The component for the Lottie spinner.
export const Loading = () => {
  const isMobile = useMediaQuery({ query: '(max-width:667px)' });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      {isMobile && (
        <Lottie
          options={defaultOptions}
          height={100}
          width={250}
          style={{ marginTop: '20px' }}
        />
      )}
      {!isMobile && (
        <Lottie options={defaultOptions} height={400} width={400} />
      )}
    </>
  );
};
