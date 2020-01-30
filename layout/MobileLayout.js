import React, {useEffect} from "react";

const MobileLayout = ({ children }) => {
  return (
    <div className="layout">
      {children}

      <style jsx>{`
        .layout {
          position: fixed;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default MobileLayout;
