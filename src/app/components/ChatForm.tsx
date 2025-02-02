import React from 'react'

export const ChatForm = ({ handleSubmit, handleInputChange, input, handleKeyPress }: { handleSubmit: (e: any) => void, handleInputChange: (e: any) => void, input: string, handleKeyPress: (e: any) => void }) => {
    return (
        <><form onSubmit={handleSubmit}>
            <div className="max-w-3xl p-4 mx-auto sm:mx-0 sm:p-0">
                <textarea
                    className="w-full p-2 border rounded shadow-xl bg-neutral-800 border-neutral-700 text-white"
                    value={input}
                    placeholder="Say something..."
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </form></>
    )
}
