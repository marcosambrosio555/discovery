const movies = [
    {
        id: "c2acf7029734f8aec81b",
        title: "The Batman",
        description: "The dark knight of gotham",
        duration: 175,
        rate: 8.7
    },
    {
        id: "face2a57ffbf449ee05f",
        title: "The Godfather 2",
        description: "An offer you can't refuse.",
        duration: 175,
        rate: 8.7
    },
    {
        id: "a1a0395595d71d727153",
        title: "Terminator",
        description: "The terminator came from future.",
        duration: 132,
        rate: 9.4
    },
    {
        id: "49c7afb879021a5fd3e8",
        title: "The avengers : infinity war",
        description: "Thanos has all infinity stones and want to kill half of univery population.",
        duration: 189,
        rate: 8.4
    },
    {
        id: "723e83c94f3a28ee2b7d",
        title: "Matrix",
        description: "Neo lives in world that anything exists.",
        duration: 145,
        rate: 9.2
    },
    {
        id: "0d721f5c8efa5995924e",
        title: "Spider-man",
        description: "The most famous super hero of Marvel comics.",
        duration: 148,
        rate: 9.1
    },
]

export function getData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(movies)
        }, 5000)
    })
}