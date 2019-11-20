import React from 'react'

export const RoundButton = () => (
    <div>
        <button className="round btn-primary"><span>+</span></button>

        <style jsx>{`
            .round {
                width: 50px;
                height: 50px;
                border-radius: 100%;
                text-align: center;
                justify-content: center;
                align-items: center;
                position: absolute;
                bottom: 20px;
                right: 20px;
                color: white;
                font-size: 30px;
                font-weight: bold;
            }
        `}</style>
    </div>
);