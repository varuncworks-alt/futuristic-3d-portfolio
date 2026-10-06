import React from 'react';

export function Scene() {
  return (
    <div className="shader-frame">
      <iframe
        title="Varun Chaturvedi — 3D Systems & Architecture Portfolio"
        src="/landing-pages/complete-shelf-v2.html"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          background: "#06070a",
          display: "block"
        }}
        loading="eager"
      />
    </div>
  );
}

export default Scene;
