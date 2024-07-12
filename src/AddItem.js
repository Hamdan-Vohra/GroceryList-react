import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'
const AddItem = ({ newItem, setnewItem, handleSubmit }) => {
    const inputRef = useRef('')
    return (
        <form className='addForm' onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor='addItem'> </label>
            <input
                autoFocus
                ref={inputRef}
                type='text'
                id="addItem"
                placeholder='Add Item'
                required
                value={newItem}
                onChange={(event) => setnewItem(event.target.value)}
            />

            <button
                type='submit'
                aria-label='Add Item'
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem