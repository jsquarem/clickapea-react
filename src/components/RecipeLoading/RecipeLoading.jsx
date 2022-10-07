import React, { useState } from 'react';
import { useEffect } from 'react';
import './RecipeLoading.css';

export default function RecipeLoading() {
  const [message, setMessage] = useState('');

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
    let i = 0;
    const showNextMessage = () => {
      if (i >= textList.length) {
        setMessage('Sowwy :(');
        return;
      }
      setMessage(textList[i]);
      i++;
      let timer = setTimeout(showNextMessage, 3000);
    };
    showNextMessage();
    return () => {
      clearTimeout(showNextMessage); // This worked for me
    };
  }, []);

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
