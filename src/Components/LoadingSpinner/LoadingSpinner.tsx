// LoadingSpinner.tsx
import React from 'react';
import loading from '../../assets/loading.gif'

const LoadingSpinner: React.FC = () => {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
        <img className='w-[60px]' src={loading} alt="" />
    </div>
  );
};

export default LoadingSpinner;
