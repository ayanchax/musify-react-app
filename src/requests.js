const getRandomKeyword = (keyword) => {
    if (keyword[Math.floor(Math.random() * keyword.length)] === undefined) {
        return keyword[0];
    }

    return keyword[Math.floor(Math.random() * keyword.length)];
};
const keyWordObject = [{
    INDIAN: [{
        popularin2021: [
            "new hindi releases",
            "taaza hindi tunes",
            "fresh  hindi tunes",
            "2021 hindi 2021 top songs",
            "popular 2021 hindi",
            "popular hindi in 2021",
            "trending hindi hits 2021",
            "2021 new hindi songs of 2021 hindi",
            "latest hindi songs 2021",
        ],
        retro: [
            "70s duets",
            "70s bollywood",
            "old songs bollywood",
            "all day retro shuffle",
            "burman classics",
            "old retro bollywood songs",
            "purane gaane bollywood",
            "retro bollywood",
        ],
        dance: [
            "dance hits hindi bollywood",
            "all time hits hindi dance dance bollywood",
            "hindi bollywood dance hits",
            "hindi bollywood super dance",
            "dance hindi playlist",
        ],
        bollywood90s: [
            "sanu 1990s",
            "sanu abhijit 90s bollywood",
            "rathod 1990s",
            "all time 1990s bollywood",
            "sad 1990 hindi songs",
            "sameer anjaan 1990s hits",
            "bollywood udit narayan 90s",
            "harmony hindi",
            "hindi 1990s",
        ],
        evergreen: [
            "old classics hindi bollywood",
            "old hindi classics",
            "old hindi bollywood",
            "classics hindi old bollywood",
            "hindi old hits bollywood",
        ],
        romantic: [
            "top genres and moods",
            "monsoon moments",
            "love songs bollywood",
            "hindi romantic songs bollywood",
            "love songs hindi",
            "all day 2000 bollywood",
            "love in bollywood",
            "bollywood all time hindi love songs",
            "new love songs bollywood",
        ],
        disco: [
            "bollywood disco",
            "disco  hindi",
            "disco  bollywood",
            "disco  hits bollywood",
            "latest  bollywood disco",
        ],
        party: [
            "party hits hindi bollywood",
            "party music hindi",
            "party on my mind",
            "wheres the party tonight",
            "party bollywood",
            "party songs in bollywood",
            "new hindi party songs",
            "hindi all time party hits",
        ],
        fusion: [
            "indian fusion hits",
            "indian contemporary fusion",
            "fusion hindi indian",
            "fusion hits India",
            "hindi fusion indian",
        ],
    }, ],
    MOOD: [{
        cokestudio: [
            "coke studio india",
            "coke studio",
            "best of coke studio",
            "coke studio hits",
            "various artists coke studio",
        ],
        workout: [
            "workout bollywood",
            "running",
            "workout",
            "cycling",
            "motivation workout",
            "exercise",
        ],
        sleep: ["ambient english", "sleep", "sleeping", "sleep"],
        meditation: [
            "meditation",
            "mindfulness",
            "morning meditate india",
            "brahma meditation",
            "calmness meditate morning",
        ],
        yoga: ["ambient", "yoga"],
    }, ],
}, ];

const apiRequestURLS = [{
    INDIAN: {
        popularin2021: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].popularin2021),
        retro: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].retro),
        dance: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].dance),
        bollywood90s: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].bollywood90s),
        evergreen: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].evergreen),
        romantic: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].romantic),
        disco: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].disco),
        party: "playlists?query=" + getRandomKeyword(keyWordObject[0].INDIAN[0].party),
        fusion: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].INDIAN[0].fusion),
    },
    MOOD: {
        cokestudio: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].MOOD[0].cokestudio),
        workout: "playlists?query=" + getRandomKeyword(keyWordObject[0].MOOD[0].workout),
        meditation: "playlists?query=" +
            getRandomKeyword(keyWordObject[0].MOOD[0].meditation),
        sleep: "playlists?query=" + getRandomKeyword(keyWordObject[0].MOOD[0].sleep),
        yoga: "playlists?query=" + getRandomKeyword(keyWordObject[0].MOOD[0].yoga),
    },
}, ];

export const categories = [{
    INDIAN: [{
            title: "Popular in 2021",
            url: apiRequestURLS[0].INDIAN.popularin2021,
            seemore: false,
        },
        {
            title: "Bollywood Retro",
            url: apiRequestURLS[0].INDIAN.retro,
            seemore: false,
        },
        {
            title: "Bollywood Dance Hits",
            url: apiRequestURLS[0].INDIAN.dance,
            seemore: false,
        },
        {
            title: "90s Bollywood",
            url: apiRequestURLS[0].INDIAN.bollywood90s,
            seemore: true,
        },

        {
            title: "Evergreen Classics",
            url: apiRequestURLS[0].INDIAN.evergreen,
            seemore: false,
        },
        {
            title: "Bollywood Romance",
            url: apiRequestURLS[0].INDIAN.romantic,
            seemore: false,
        },
        {
            title: "मैं एक डिस्को",
            url: apiRequestURLS[0].INDIAN.disco,
            seemore: false,
        },
        {
            title: "Bollywood Party Hits",
            url: apiRequestURLS[0].INDIAN.party,
            seemore: false,
        },
        {
            title: "Indian Fusion",
            url: apiRequestURLS[0].INDIAN.fusion,
            seemore: false,
        },
    ],

    MOOD: [{
            title: "Coke Studio",
            url: apiRequestURLS[0].MOOD.cokestudio,
            seemore: false,
        },
        {
            title: "Workouts",
            url: apiRequestURLS[0].MOOD.workout,
            seemore: false,
        },
        {
            title: "Meditation",
            url: apiRequestURLS[0].MOOD.meditation,
            seemore: false,
        },
        {
            title: "Sleep",
            url: apiRequestURLS[0].MOOD.sleep,
            seemore: false,
        },
        {
            title: "Morning Yoga",
            url: apiRequestURLS[0].MOOD.yoga,
            seemore: false,
        },
    ],

    WESTERN: [{
            ROCK: [{
                    title: "Classic | Alternative | Rock Ballad | Hard | Soft",
                    url: "playlists?query=classic rock english",
                    seemore: false,
                },
                {
                    title: "Heavy Metal",
                    url: "playlists?query=heavy metal english",
                    seemore: false,
                },
                {
                    title: "Grunge",
                    url: "playlists?query=grunge english",
                    seemore: false,
                },
                {
                    title: "Grunge",
                    url: "playlists?query=post grunge english",
                    seemore: false,
                },
                {
                    title: "Punk",
                    url: "playlists?query=punk",
                    seemore: false,
                },
                {
                    title: "Funk",
                    url: "playlists?query=funk",
                    seemore: false,
                },
                {
                    title: "Country",
                    url: "playlists?query=country english",
                    seemore: false,
                },
                {
                    title: "Progressive",
                    url: "playlists?query=Progressive english",
                    seemore: false,
                },
                {
                    title: "Progressive",
                    url: "playlists?query=Psychadelic english",
                    seemore: false,
                },
                {
                    title: "Progressive",
                    url: "playlists?query=Psychadelic english",
                    seemore: false,
                },
                {
                    title: "Blues",
                    url: "playlists?query=blues english",
                    seemore: false,
                },
                {
                    title: "Folk",
                    url: "playlists?query=folk english",
                    seemore: false,
                },
            ],
        },

        {
            OTHERS: [{
                    title: "Electronic Dance Music(EDM)",
                    url: "playlists?query= edm english",
                    seemore: false,
                },
                {
                    title: "Dubstep",
                    url: "playlists?query= dubstep english",
                    seemore: false,
                },
                {
                    title: "Techno",
                    url: "playlists?query= techno english",
                    seemore: false,
                },
                {
                    title: "Hip Hop Workout",
                    url: "playlists?query= Hip Hop english",
                    seemore: false,
                },
                {
                    title: "Hip Hop Workout",
                    url: "playlists?query= Hip Hop english",
                    seemore: false,
                },
                {
                    title: "Gospel",
                    url: "playlists?query= Gospel english",
                    seemore: false,
                },
                {
                    title: "Reggae",
                    url: "playlists?query= Reggae english",
                    seemore: false,
                },
            ],
        },
    ],
}, ];

export const artists = [{
        INDIAN: [{
                id: "1",
                name: "Manna De",
                url: "https://a10.gaanacdn.com/gn_img/artists/VdNW0Mbo5e/VdNW0Ewbo5/size_m_1558421471.jpg",
                type: "Singer",
            },
            {
                id: "2",
                name: "Kishore Kumar",
                url: "https://a10.gaanacdn.com/gn_img/artists/DwPKOxB3qV/DwPKOv0bqV/size_m_1516276549.jpg",
                type: "Singer",
            },
            {
                id: "3",
                name: "Mohd. Rafi",
                url: "https://a10.gaanacdn.com/gn_img/artists/ZaP37OR3Dy/ZaP37B6KDy/size_m_1558421598.jpg",
                type: "Singer",
            },
            {
                id: "4",
                name: "Mukesh",
                url: "https://a10.gaanacdn.com/gn_img/artists/qa4WEqqWP1/qa4WELq3P1/size_m_1568900048.jpg",
                type: "Singer",
            },
            {
                id: "5",
                name: "Lata Mangeshkar",
                url: "https://odishabytes.com/wp-content/uploads/2019/09/Lata.jpeg",
                type: "Singer",
            },
            {
                id: "6",
                name: "Asha Bhosle",
                url: "https://a10.gaanacdn.com/gn_img/artists/qa4WEqqWP1/a4WEqxP8WP/size_m_1516183490.jpg",
                type: "Singer",
            },
            {
                id: "7",
                name: "Bappi Lahiri",
                url: "https://a10.gaanacdn.com/gn_img/artists/koMWQ7BKqL/koMWQDX3qL/size_m_1558421043.jpg",
                type: "Music Director",
            },
            {
                id: "8",
                name: "Talat Aziz",
                url: "https://a10.gaanacdn.com/gn_img/albums/Bp1bAynb02/p1bAy4A7b0/size_m.jpg",
                type: "Singer",
            },
            {
                id: "9",
                name: "Kumar Sanu",
                url: "https://a10.gaanacdn.com/gn_img/artists/R7vKX6WmrP/R7vKX6WmrP/size_m_1559571407.jpg",
                type: "Singer",
            },
            {
                id: "40",
                name: "Udit Narayan",
                url: "https://a10.gaanacdn.com/gn_img/artists/w4MKPObojg/w4MKPObojg/size_m_1516799177.jpg",
                type: "Singer",
            },
            {
                id: "10",
                name: "Alka Yagnik",
                url: "https://a10.gaanacdn.com/gn_img/artists/DwPKOBbqVZ/DwPKOBbqVZ/size_m_1516104380.jpg",
                type: "Singer",
            },
            {
                id: "11",
                name: "Sadhana Sargam",
                url: "https://a10.gaanacdn.com/gn_img/artists/qaLKY623pO/aLKYjpn3pO/size_m_1558422062.jpg",
                type: "Singer",
            },
            {
                id: "12",
                name: "Vinod Rathod",
                url: "https://a10.gaanacdn.com/gn_img/artists/D0PKLrWGl9/D0PKLrWGl9/size_m_1560145034.jpg",
                type: "Singer",
            },
            {
                id: "13",
                name: "Sonu Nigam",
                url: "https://a10.gaanacdn.com/gn_img/artists/kGxbn03y4r/Gxbn1keMWy/size_m_1516792999.jpg",
                type: "Singer",
            },
            {
                id: "14",
                name: "Mohit Chauhan",
                url: "https://a10.gaanacdn.com/gn_img/artists/ZaP374RWDy/ZaP372BKDy/size_m_1568903119.jpg",
                type: "Singer",
            },
            {
                id: "15",
                name: "Nusrat Fateh Ali Khan",
                url: "https://a10.gaanacdn.com/gn_img/artists/D0PKLqr3Gl/0PKLqkw3Gl/size_m_1568899628.jpg",
                type: "Singer",
            },
            {
                id: "16",
                name: "Atif Aslam",
                url: "https://a10.gaanacdn.com/gn_img/artists/21GWwrR3pk/1GWwknpWpk/size_m_1516184023.jpg",
                type: "Singer",
            },
            {
                id: "17",
                name: "Adnan Sami",
                url: "https://a10.gaanacdn.com/gn_img/artists/R7vKX6WmrP/R7vKX1X3mr/size_m_1516101602.jpg",
                type: "Singer",
            },
            {
                id: "18",
                name: "Vishal Shekhar",
                url: "https://a10.gaanacdn.com/gn_img/artists/Oxd3xP3gVY/xd3x7pYKgV/size_m_1558425309.jpg",
                type: "Singer",
            },
            {
                id: "19",
                name: "Shreya Ghoshal",
                url: "https://a10.gaanacdn.com/gn_pl_img/playlists/lJvKa16KDV/JvKa4R9kbD/size_m_1520836018.jpg",
                type: "Singer",
            },
            {
                id: "20",
                name: "Sunidhi Chauhan",
                url: "https://a10.gaanacdn.com/images/artists/12/12/crop_175x175_12.jpg",
                type: "Singer",
            },
            {
                id: "21",
                name: "AR Rahman",
                url: "https://a10.gaanacdn.com/gn_img/artists/9En3pqeWXD/En3pQZ9WXD/size_m_1558423917.jpg",
                type: "Singer",
            },
            {
                id: "22",
                name: "Arijit Singh",
                url: "https://a10.gaanacdn.com/gn_img/artists/Dk9KNk23Bx/k9KNqJJbBx/size_m_1516172157.jpg",
                type: "Singer",
            },
            {
                id: "23",
                name: "KK",
                url: "https://a10.gaanacdn.com/gn_img/artists/DwPKOBbqVZ/DwPKOk0KqV/size_m_1558442140.jpg",
                type: "Singer",
            },
            {
                id: "24",
                name: "Lucky Ali",
                url: "https://a10.gaanacdn.com/gn_img/artists/w4MKPObojg/w4MKPkjboj/size_m_1530355943.jpg",
                type: "Singer",
            },
            {
                id: "25",
                name: "Shaan",
                url: "https://a10.gaanacdn.com/gn_img/artists/g4w3vr3jJB/g4w3vr3jJB/size_m_1568902466.jpg",
                type: "Singer",
            },
            {
                id: "26",
                name: "Abhijeet",
                url: "https://a10.gaanacdn.com/gn_img/artists/10q3Z1K52r/0q3Zj7En35/size_m.jpg",
                type: "Singer",
            },
            {
                id: "27",
                name: "Amit Trivedi",
                url: "https://a10.gaanacdn.com/gn_img/artists/DwPKOBbqVZ/DwPKO8q3qV/size_m_1587447211.jpg",
                type: "Singer",
            },
            {
                id: "28",
                name: "Benny Dayal",
                url: "https://a10.gaanacdn.com/gn_img/artists/01A3mar3NQ/01A3mm53NQ/size_m_1516186618.jpg",
                type: "Singer",
            },
            {
                id: "29",
                name: "Zubeen Garg",
                url: "https://a10.gaanacdn.com/gn_img/artists/w4MKPDOKoj/4MKPkYzboj/size_m_1602571162.jpg",
                type: "Singer",
            },
            {
                id: "30",
                name: "Jubin Nautiyal",
                url: "https://a10.gaanacdn.com/gn_img/artists/10q3ZR1352/0q3Z6Lg135/size_m_1597136498.jpg",
                type: "Singer",
            },
            {
                id: "31",
                name: "Papon",
                url: "https://a10.gaanacdn.com/gn_img/artists/z8k3y13rxo/z8k3yJPWrx/size_m_1516705196.jpg",
                type: "Singer",
            },
            {
                id: "32",
                name: "Neha Kakkar",
                url: "https://a10.gaanacdn.com/gn_img/artists/Rz4W87v3xD/Rz4W8ppWxD/size_m_1516701680.jpg",
                type: "Singer",
            },
            {
                id: "33",
                name: "Badshah",
                url: "https://a10.gaanacdn.com/gn_img/artists/9MAWe7KyJe/MAWe9lBGWy/size_m_1516185303.jpg",
                type: "Singer",
            },
            {
                id: "34",
                name: "Honey Singh",
                url: "https://a10.gaanacdn.com/gn_img/artists/w4MKPDOKoj/4MKPgoQgbo/size_m_1516802409.jpg",
                type: "Rapper",
            },
            {
                id: "35",
                name: "Raftaar",
                url: "https://a10.gaanacdn.com/gn_img/artists/BZgWoQOK2d/ZgWozoJ532/size_m_1587455314.jpg",
                type: "Rapper",
            },
            {
                id: "36",
                name: "Anupam Roy",
                url: "https://a10.gaanacdn.com/gn_img/artists/VdNW0Mbo5e/dNW0JRLpKo/size_m.jpg",
                type: "Singer",
            },
            {
                id: "37",
                name: "Nachiketa",
                url: "https://a10.gaanacdn.com/gn_img/artists/kGxbn03y4r/GxbnwdVKy4/size_m.jpg",
                type: "Singer",
            },
            {
                id: "38",
                name: "Silajit",
                url: "https://a10.gaanacdn.com/gn_img/artists/0wrb4kNWLg/wrb4ADNKLg/size_m.jpg",
                type: "Singer",
            },
            {
                id: "39",
                name: "Rupankar Bagchi",
                url: "https://a10.gaanacdn.com/gn_img/artists/NOXWVgbkqL/NOXWVJ9Wkq/size_m.jpg",
                type: "Singer",
            },
        ],
    },
    {
        WESTERN: [{
                id: "1",
                name: "Bryan Adams",
                url: "",
                type: "Singer",
            },
            {
                id: "2",
                name: "Phil Collins",
                url: "",
                type: "Singer",
            },
            {
                id: "3",
                name: "Jeff Buckley",
                url: "",
                type: "Singer",
            },
            {
                id: "4",
                name: "George Micheal",
                url: "",
                type: "Singer",
            },
            {
                id: "5",
                name: "Elton John",
                url: "",
                type: "Singer",
            },
            {
                id: "6",
                name: "Eminem",
                url: "",
                type: "Singer",
            },
            {
                id: "7",
                name: "Celine Dion",
                url: "",
                type: "Singer",
            },
            {
                id: "8",
                name: "Adele",
                url: "",
                type: "Singer",
            },
            {
                id: "9",
                name: "Vanessa Williams",
                url: "",
                type: "Singer",
            },
            {
                id: "10",
                name: "Sarah McLachlan",
                url: "",
                type: "Singer",
            },
            {
                id: "11",
                name: "Christina Perri",
                url: "",
                type: "Singer",
            },
            {
                id: "12",
                name: "Lana Del Rey",
                url: "",
                type: "Singer",
            },
            {
                id: "13",
                name: "Sia",
                url: "",
                type: "Singer",
            },
        ],
    },
];
export const bands = [{
    WESTERN: [{
            id: "1",
            name: "Pink Floyd",
            url: "",
        },
        {
            id: "2",
            name: "Radiohead",
            url: "",
        },
        {
            id: "3",
            name: "Guns n Roses",
            url: "",
        },
        {
            id: "4",
            name: "Scorpions",
            url: "",
        },
        {
            id: "5",
            name: "Coldplay",
            url: "",
        },
        {
            id: "6",
            name: "The Beatles",
            url: "",
        },
        {
            id: "7",
            name: "The Police",
            url: "",
        },
        {
            id: "8",
            name: "Backstreet Boys",
            url: "",
        },
        {
            id: "9",
            name: "Westlife",
            url: "",
        },
        {
            id: "10",
            name: "Michael Learns to Rock",
            url: "",
        },
    ],
    BANGLA: [{
            id: "1",
            name: "Moheener Ghoraguli",
            url: "https://a10.gaanacdn.com/gn_img/albums/lJvKa16KDV/JvKaaZr4KD/size_m.jpg",
        },
        {
            id: "2",
            name: "Fossils",
            url: "https://a10.gaanacdn.com/gn_img/artists/2lV3dl13Rg/lV3dGzZKRg/size_m.jpg",
        },
        {
            id: "3",
            name: "Bhoomi",
            url: "https://a10.gaanacdn.com/images/albums/14/2208814/crop_480x480_2208814.jpg",
        },
        {
            id: "4",
            name: "Cactus",
            url: "https://a10.gaanacdn.com/gn_img/albums/dwN39y83DP/wN39rlvWDP/size_xxl.webp",
        },
    ],
}, ];

export const regionalSection = [{
        title: "বাংলা",
        city: "কলকাতা",
        url: "images/regional/kolkata.jfif",
    },
    {
        title: "অসমীয়া",
        city: "আসাম",
        url: "images/regional/assam.jfif",
    },

    {
        title: "ଓଡିଆ",
        city: "ଓରିସା",
        url: "images/regional/orissa.png",
    },

    {
        title: "ಕನ್ನಡ",
        city: "ಬೆಂಗಳೂರು",
        url: "images/regional/bangalore.jfif",
    },
];