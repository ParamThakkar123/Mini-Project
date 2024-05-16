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
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-2xl font-bold mb-2">{item.itemname}</h2>
                <p className="text-gray-600 mb-2">{item.itemdescription}</p>
                <p className="text-lg font-bold mb-2">${item.itemprice}</p>
                <img src={item.itemimageurl} alt={item.itemname} className="w-full h-48 object-cover rounded-md mb-2" />
                <input type="number" value={quantity} onChange={handleQuantityChange} className="w-full border border-gray-300 p-2 rounded-md mb-2" />
                <button onClick={handleOrderPlacement} className="bg-blue-500 text-white px-4 py-2 rounded-md">Place Order</button>
            </div>
        </div>
    );
}

export default ItemDetailsPage