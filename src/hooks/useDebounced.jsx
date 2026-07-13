import React, { useEffect, useState } from 'react'

const useDebounced = (value , timer = 400) => {
  const [debounceValue, setDebounceValue] = useState('');
  

  useEffect(()=>{

    const time = setTimeout(()=>{
      setDebounceValue(value);
    },timer)

    return () => {clearTimeout(time)};
  },[value,timer])

  return debounceValue;
}

export default useDebounced;