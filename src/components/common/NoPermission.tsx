import React from 'react'

const NoPermission = ({ message }: { message: string }) => {
    return (
        <div>
            <div className="container py-8 flex justify-center items-center min-h-[60vh]">You do not have permission to view this page.

                <p>{message}</p>

            </div>
        </div>
    )
}

export default NoPermission
