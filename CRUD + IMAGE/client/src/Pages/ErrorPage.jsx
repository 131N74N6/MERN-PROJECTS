import React from 'react'

export default function ErrorPage({ text }) {
    return (
        <div className="error-page">
            <div className="error-msg">{text}</div>
        </div>
    )
}
