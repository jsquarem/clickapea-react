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
      'Cooking in progress..',
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
      let timer = setTimeout(showNextMessage, 3000);
    };
    showNextMessage();
    return () => {
      clearTimeout(showNextMessage); // This worked for me
    };
  }, []);

  // return (
  //   <div
  //     style={{ minHeight: '38em', opacity: '.5', color: '#463d39' }}
  //     className="col-12 p-5 mt-2 d-flex align-items-center justify-content-center bg-primary text-center rounded-pill"
  //   >
  //     <h1 style={{ fontSize: '5rem' }}>{message}</h1>
  //   </div>
  // );
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 animation-col">
          <h1 className="load-heading">{message}</h1>
          <div id="cooking">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div id="area">
              <div id="sides">
                <div id="pan"></div>
                <div id="handle"></div>
              </div>
              <div
                id="pancake"
                className="text-center align-items-center text-white"
              >
                <div id="pastry">
                  <h1 className="mt-4">?</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
