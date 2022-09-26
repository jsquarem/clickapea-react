import React, { useState } from 'react';
import { useEffect } from 'react';
import { UNSAFE_DataRouterStateContext } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './RecipeLoading.css';

export default function RecipeLoading() {
  const [message, setMessage] = useState('');

  //useEffect(() => {
  // startAnimation();
  // //}, []);
  // const startAnimation = () => {
  //console.log(message, '<-message');

  useEffect(() => {
    const textList = [
      'Checking our database...',
      "Didn't find it, checking somewhere else",
      'Oh wow not there either, ok! Searching the internet...',
      "There we go, we're pulling it and casting our magic spells on it",
      'Oh here it comes now!',
      'Ummm looks like it got lost',
      "Yea ok, well, sorry about this, but looks like it's broken",
      "Yeah..... as a valued customer, you're entitled to a 100% refund on this search",
    ];
    let index = 0;
    const showNextMessage = () => {
      if (index >= textList.length) {
        setMessage('Sowwy :(');
        return;
      }
      setMessage(textList[index]);
      index++;
      let timer = setTimeout(showNextMessage, 2000);
    };
    showNextMessage();
    return () => {
      clearTimeout(showNextMessage); // This worked for me
    };
  }, []);

  return (
    <div
      style={{ minHeight: '38em' }}
      className="col-12 p-5 mt-2 d-flex align-items-center justify-content-center bg-primary text-center"
    >
      <h1>{message}</h1>
    </div>
  );
}
