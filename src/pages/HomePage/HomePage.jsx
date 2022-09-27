import React from 'react';

export default function HomePage() {
  return (
    <>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: `url(
            'https://catcollection7-11.s3.us-east-2.amazonaws.com/pexels-ella-olsson-1600.jpg'
          )`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
          minHeight: '73vh',
          width: '',
        }}
      >
        <div className="mask" style={{ backgroundColor: `rgba(0, 0, 0, 0.6)` }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Heading</h1>
              <h4 className="mb-3">Subheading</h4>
              <a className="btn btn-outline-light btn-lg" role="button">
                Call to action
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
