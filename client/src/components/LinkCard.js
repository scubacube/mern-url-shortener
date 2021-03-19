import React from 'react';

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Your link</h2>
            <p>Your link: <a href={link.to}
                             target="_blank"
                             rel="noopener noreferrer">{link.to}</a></p>
            <p>Your link: <a href={link.from}
                             target="_blank"
                             rel="noopener noreferrer">{link.from}</a></p>
            <p>Click count: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}