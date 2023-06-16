import * as React from 'react';
import './App.css'
import dataJson from "./data.json"
import { Gallery, GalleryItem } from './components/Layout3';
import appConfig from "./appConfig.json"
import SearchAppBar from './components/SearchAppBar';
import axios from 'axios';
import { useState } from 'react';
//import Card2 from './components/Card2';
import Card2 from './components/CardMirko'

export default function App() {

    const [data, setData] = useState(null)
    
    // axios.get is an asyncronous function
    // you use .then chain with input function that takes
    //  * previous chain's return as input
    axios.get(appConfig.entryUrl)
        .then((response) => {
            console.log(response)
            if(response.status===200){
                setData(response.data)
            }
        })
    
    // data null means false
    // data is a state variable. this makes appcontent a state-dependent 
    // component
    let appcontent = data ? 
        <AppContent users={convertUsersToArrayOfObject(data)}/>:
        <div>Loading...</div>

    return (
        <div className="App">
          {appcontent}
        </div>
    )
}

function convertUsersToArrayOfObject(users) {
    const pos = getUserPositionIndex(users[0])

    const usersArrayOfObject = users.map(
        (user) => {
            return getUser(user, pos)
        }
    )
    usersArrayOfObject.shift()
    return usersArrayOfObject
}

function getUser(targetUser, pos) {
    return (
        {
            name: targetUser[pos.name],
            grade: targetUser[pos.grade],
            imgSrc: targetUser[pos.imgSrc],
            wish: targetUser[pos.wish],
            id: targetUser[pos.id]
        }
    )
}
function getUserPositionIndex(user0) {
    var pos = Object()
    user0.map(
        (e, i) => {
            pos[e] = i
        }
    )
    pos.imgSrc = pos.ThumbnailLink
    pos.name = pos.Name
    pos.grade = pos.Grade
    pos.wish = pos.Wish
    return pos
}

function AppContent({ users }) {
    console.log(users)
    // window.users means there is a global variable named users
    window.users = users
    window.autocompleteOptions = [] // autocompleteOptions is a global variable
    users.forEach(e => {
        window.autocompleteOptions.push(
            {
                label: e.name + ' - ' + e.grade,
                id: e.id
            }
        )
    })
    const cards = users.map((e, i) => { 
        if (!Object.values(e).includes(null) && !Object.values(e).includes(undefined) && !Object.values(e).includes('') && !Object.values(e).includes(' ')) {
            return (
                <GalleryItem key={i}>
                    <Card2 user={e} />
                    {/* <Item sx={{height: "300px"}}/> */}
                    {/* <Card user={e} style={style}/>   */}
                </GalleryItem>
            )
        }
    })
    return (
        <>
            <div className="main2">
                <Gallery>
                    <>
                        {cards}
                        <div className="endCard" />
                    </>
                </Gallery>
            </div>

            <div className="footer2">
                <SearchAppBar autocompleteOptions={window.autocompleteOptions} />
            </div>
        </>
    )
}

