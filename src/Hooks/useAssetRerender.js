import { userForceAssetRerender } from '@/api/downloads';
import { useState } from 'react';

export function useAssetRerender(assetID) {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const rerenderAsset = async () => {
    setStatus('loading');
    try {
      await userForceAssetRerender(assetID);
      setStatus('success');
      setMessage('The asset has been qued for rendering, Please check back in a few mins');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to re-render the asset. Please try again.');
    }
  };

  return { rerenderAsset, status, message }; 
}
