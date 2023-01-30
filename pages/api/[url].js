import Cors from 'cors'
import ytdl from "ytdl-core"

const YOUTUBE_URL_STARTER = "https://www.youtube.com/watch?v="

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    origin: false,
    methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function getVideoData(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    // Get the YouTube id from the query
    let { url } = req.query;

    // Create the full URL
    url = YOUTUBE_URL_STARTER + url;

    // Get the highest quality audioFormat
    let videoInfo = await ytdl.getInfo(url);
    let audioFormat = ytdl.chooseFormat(videoInfo.formats, { quality: "highestaudio" });

    res.json({ audioFormat: audioFormat })
}