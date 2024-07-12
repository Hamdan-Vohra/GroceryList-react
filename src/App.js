import { useState, useEffect } from 'react'
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem'
import SearchBar from './SearchBar'
import apiRequest from './apiRequest';

function App() {
  //using Hooks' List
  const API_URL = 'http://localhost:3500/items'
  const [items, setItem] = useState([])
  const [newItem, setnewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error('Did not receive expected data')
      const listItems = await response.json();
      setItem(listItems)
      setFetchError(null)
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  //will run at load-time only once
  useEffect(() => {
    //to simulate fetching data we use setimeout that will wait for a while and call
    setTimeout(() => {
      fetchItems();
    }, 2000)
    //fetchItems is returning something then we will invoke like this
    // (async()=>{const items = await fetchItems()});
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItem(listItems);

    //handling post request
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, options);
    if (result) setFetchError(result)
  }

  const handleCheck = async (id) => {
    //we can not update a individual state
    const listItems = items.map((item) =>
      (item.id === id) ? { ...item, checked: !item.checked } : item
    );
    setItem(listItems);

    const myUpdatedItem = listItems.find((item) => item.id === id)
    console.log(myUpdatedItem)
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myUpdatedItem.checked })
    }
    const result = await apiRequest(`${API_URL}/${id}`, options)
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) =>
      item.id !== id
    );
    setItem(listItems);

    const options = {
      method: 'DELETE',
    }
    const result = await apiRequest(`${API_URL}/${id}`, options)
    if (result) setFetchError(result)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setnewItem('')
  }
  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem newItem={newItem}
        setnewItem={setnewItem}
        handleSubmit={handleSubmit} />
      <SearchBar
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items....</p>}
        {fetchError ?
          <p style={{ color: 'red' }}>Error: {fetchError}</p> :
          !isLoading && <Content
            items={items.filter((item) => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        }
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
