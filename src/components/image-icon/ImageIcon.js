import React from 'react';

const ImageIcon = ({ src, alt, onClick, customContainerClass }) => {
    return (
        <div onClick={onClick}>
            <img className={customContainerClass ?? undefined} src={src} alt={alt} />
        </div>
    );
}

export { ImageIcon };