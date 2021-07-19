// import the 
import { useState, useEffect } from 'react'

import React from 'react'


function Restaurants(props) {
    // variables are assigned to store details once the restaurant details are fetched
    const [info, setinfo] = useState({
        id: '',
        name: '',
        address: '',
        phone: '',
        hours: '',
        notes: [],
        lat: '',
        lon: '',
    })
    //Restaurant Id is assigned to a variable
    let restInfo = props.match.params.id

    useEffect(() => {
        // when the state is empty or doesn't match, a new one will be visited
        if (info.id === '' || info.id !== restInfo) {

            //fetch the restaurant id from the api points
            fetch(`/api/${restInfo}`)
                .then((res) => res.json())
                //then you store it
                .then(restaurantDetails => {
                    setinfo(restaurantDetails)
                    //setting the location on map for each individual page
                    props.setZoom({
                        zoomIn: true,
                        zoom: 20,
                        center: [restaurantDetails.lat, restaurantDetails.lon],
                    })
                })
        }
    })

    return (
        <div id='infocontainer'>
            <h1 id='directory'>Restaurant Information</h1>
            <div id='resinfo'>
                {/*restaurant details are retrieved through fetch */}
                <h2 className="info">{info.name}</h2>
                <h4 className="info">{info.address}</h4>
                <h4 className="info">{info.category}</h4>
                <h4 className="info">{info.phone}</h4>
                <h4 className="info">{info.website}</h4>
                <h4 className="info">{info.hours}</h4>
                <br />
                <h2>Notes:</h2>
                <h4 className="notes">{info.notes}</h4>

            </div>

            {/*Comments to be added*/}
            <div id="comments">
                <h3>What Do You Think?:</h3>
                <div id="review">
                    {/*the comment form*/}
                    <form id="post-review" method="POST" action={`/note/${restInfo}`}>

                        <textarea id="textarea" name="body" placeholder="Add a Comment"></textarea>
                        <input id="submit" type="submit" name="comment" />
                    </form>

                </div>

            </div>

        </div>

    )
}

export default Restaurants