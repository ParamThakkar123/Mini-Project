import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ItemDetailsPage = () => {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try{
                const response = await fetch(`http://localhost:5000/getItems/${id}`)
                const data = await response.json();
                setItem(data);
            }catch(err){
                console.error("Error fetching item details", err);
            }
        }

        fetchItemDetails();
    }, [id]);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handleOrderPlacement = async () => {
        try{
            const response = await fetch('http://localhost:5000/placeOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({itemId: item._id, quantity})
            })

            const data = await response.json();
            alert(data.message)
        }catch(error){
            console.error("Error placing order", order)
            alert('Failed to place order!')
        }
    }

    if (!item) {
        return <div>Loading...</div>;
    }

  return (
  <div>
    <div>
        <h2>{item.itemname}</h2>
        <p>{item.itemdescription}</p>
        <p>${item.itemprice}</p>
        <img src={item.itemimageurl} alt={item.itemname} />
        <input type="number" value={quantity} onChange={handleQuantityChange} />
        <button onClick={handleOrderPlacement}>Place Order</button>
    </div>
  </div>
  )
}

export default ItemDetailsPage
