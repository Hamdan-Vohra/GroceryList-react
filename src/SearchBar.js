import React from 'react'

const SearchBar = ({ search, setSearch }) => {
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='searchItem' >Search</label>
            <input
                id='searchItem'
                placeholder='Search Items'
                type='text'
                role='searchbox'
                value={search}
                onChange={(e) => setSearch(e.target.value)}></input>
        </form>
    )
}

export default SearchBar