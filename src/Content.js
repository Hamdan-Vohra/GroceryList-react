import ListItem from './ItemList'
const Content = ({ items, handleCheck, handleDelete }) => {

    return (
        <>
            {items.length ? (<ListItem
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />) : (
                <p style={{ color: 'red', marginTop: '2rem' }} > You have an Empty List</p>
            )}
        </>
    )
}

export default Content