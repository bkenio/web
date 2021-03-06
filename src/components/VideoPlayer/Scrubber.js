import React, { useEffect, useState, } from 'react';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack, Box, } from '@chakra-ui/react';

function Duration({ vRef = {} }) {
  const bufferedLength = vRef?.current?.buffered?.length;
  const bufferedEnd = bufferedLength ? vRef?.current?.buffered?.end(bufferedLength - 1) : 0;
  // const bufferedStart = bufferedLength ? vRef?.current?.buffered?.start(0) : 0;

  const [progress, setProgress ] = useState(0);

  useEffect(() => {
    if (vRef.current.currentTime) {
      if (Number.isNaN(vRef.current.currentTime)) {
        setProgress(0);
      } else {
        setProgress(vRef.current.currentTime);
      }
    }
  }, []);

  useEffect(() => {
    function timeUpdate() {
      if (vRef?.current?.currentTime) {
        setProgress(vRef?.current?.currentTime);
      }
    }

    vRef?.current.addEventListener('timeupdate', timeUpdate);
    return () => {
      if (vRef?.current) {
        vRef?.current?.removeEventListener('timeupdate', timeUpdate);
      }
    };
  }, [vRef]);

  const bufferPosPercentage = `${(bufferedEnd / vRef?.current?.duration || 0) * 100}% !important`;
  
  return (
    <Slider
      id='current'
      cursor='pointer'
      focusThumbOnChange={false}
      onChange={(val) => {
        setProgress(val);
        vRef.current.currentTime = val;
      }} 
      max={vRef?.current?.duration || 100}
      value={progress || 0}
      aria-label='current'
    >
      <SliderTrack bg='rgba(255, 255, 255, 0.2)'>
        <SliderFilledTrack zIndex='1' bg='#bf1e2e' />
        <SliderFilledTrack rounded='md' zIndex='-1' width={bufferPosPercentage} bg='rgba(190, 190, 190, 1)' />
      </SliderTrack>
      <SliderThumb bg='#bf1e2e'/>
    </Slider>
  );
}

export default Duration;