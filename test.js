// let data = require("./endsong.json")
import { data } from "./allstreams.js"
let tableBody = document.querySelector('tbody')

// console.log(new Date(data[2].ts).toString())
console.log(data.sort((a, b) => new Date(b.ts) - new Date(a.ts))[0])

let x = []

data.forEach(stream => {
    let anExistingEntry = x.find(entry => entry.albumName == stream.master_metadata_album_album_name)
    if(anExistingEntry) {
       anExistingEntry.streamCount += 1
    } else {
        x.push({
            albumName: stream.master_metadata_album_album_name,
            artistName: stream.master_metadata_album_artist_name,
            lastStreamed: new Date(stream.ts).toDateString(),
            streamCount: 1
        })
    }
})

console.log(x)

x.sort((a, b) => b.streamCount-a.streamCount).map(album => {
    return {
        ...album,
        streamCount: Math.round(album.streamCount / 12)
    }
}).filter(album => album.streamCount > 0).forEach((el, i) => {
    tableBody.innerHTML += `
                                <tr>
                                    <td>${i+1}</td>
                                    <td>${el.albumName}</td>
                                    <td>${el.artistName}</td>
                                    <td>${el.streamCount}</td>
                                    <td>${el.lastStreamed}</td>
                                </tr>
                    `
})