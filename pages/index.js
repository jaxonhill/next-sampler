import { useState } from "react"

const parseVideoIDFromURL = (url) => {
  const regExp = /^https:\/\/www\.youtube\.com\/watch\?v=([^#\&\?]*)/;
  const match = url.match(regExp);

  if (match) {
    return match[1];
  } else {
    return null;
  }
}

export default function Home() {
  const [userURL, setUserURL] = useState("");
  const [returnedAudioURL, setReturnedAudioURL] = useState("");

  const handleClick = async (url) => {
    let vidID = parseVideoIDFromURL(url)

    if (vidID) {
      fetch(`/api/${vidID}`)
        .then(res => res.json())
        .then(data => setReturnedAudioURL(data.audioFormat.url));
    }
  }

  console.log(returnedAudioURL);

  return (
    <div className="flex flex-col pt-16 items-center">
      <h1 className="text-center">Enter a YouTube url</h1>
      <input
        className="w-96 bg-gray-200"
        value={userURL}
        onChange={(e) => setUserURL(e.target.value)}
        type="text"
      />
      <button onClick={() => handleClick(userURL)}>Download</button>
      {returnedAudioURL && <audio controls><source src={returnedAudioURL} /></audio>}
    </div>
  )
}
