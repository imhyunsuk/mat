import React, { useState } from 'react';

export const StoreAddButton = ({onClick}) => {
    const newWindow = () => window.open('/', '_blank');
    
    return (
        <div>
            <button className="round btn-primary" onClick={onClick}><span>+</span></button>

            <style jsx>{`
                .round {
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    bottom: 10px;
                    right: 20px;
                    color: white;
                    font-size: 30px;
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
};