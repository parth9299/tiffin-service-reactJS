import React from 'react'

export default function Breadcrumb({ title, button }) {
    return (
        <>
            <div className="d-flex justify-content-between">
                <div className='d-flex align-items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='back-button' viewBox="0 0 24 24"><path fill="#020202" d="M11.53 6.47a.75.75 0 0 1 0 1.06l-3.72 3.72H18a.75.75 0 0 1 0 1.5H7.81l3.72 3.72a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 0"></path></svg>
                    <h2 className='mb-0'> {title}</h2>


                </div>
                {button}
            </div>
        </>
    )
}
