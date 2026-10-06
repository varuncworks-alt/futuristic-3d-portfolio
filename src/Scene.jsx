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
          background: "#080808",
          display: "block"
        }}
        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
        loading="eager"
      />
    </div>
  );
}

export default Scene;
