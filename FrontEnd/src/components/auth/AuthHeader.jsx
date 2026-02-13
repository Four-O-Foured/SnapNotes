import React from 'react';

const AuthHeader = ({ title, subtitle }) => {
    return (
        <div className="relative mb-10 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2 gradient-text">
                {title}
            </h1>
            <p className="text-snap-text-secondary text-sm">
                {subtitle}
            </p>
        </div>
    );
};

export default AuthHeader;
