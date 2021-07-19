import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function Home(props) {
    //set up a state to store restaurant names  
    const [name, setName] = useState([])

    //hook to list names on home page
    useEffect(() => {
        if (name.length === 0) {
            //info fetched from api
            fetch("/api")
                .then((res) => res.json())
                // stored in a variable
                .then(name => {
                    setName(name)
                    props.setZoom({ zoomIn: false, zoom: 15 , center:[44.167201, -73.252640]})
                })
        }
    })
    //Restaurant id's are capitalized
    function capitalize(str) {
        // name strings are split, all the "-"'s sliced then joined again
        let strArray = str.split(" ");
        let i = 0;
        while (i < strArray.length) {
            strArray[i] =
                strArray[i][0].toUpperCase() + strArray[i].slice(1).toLowerCase();
            i++;
        }
        return strArray.join(" ");
    }


    return (
       
<div>
        <h1 id ="directory">Addison County Restaurants</h1>
         {/* each restaurant from my list is made as a link to pass on to info page when clicked as opposed to eight separate pages  */}
            <div id='navbar'>  
            <ul>
                {name.map((rest, index) => {
                    return (<h3 key={index}>
                        <li>
                            <Link className="reslink" to={`/restaurant/${rest}`}>
                                {capitalize(rest.replaceAll('-', ' '))}
                            </Link>
                        </li>
                    </h3>
                    )
                })
                }
            </ul>
        </div>
        </div>
    )
}

export default Home