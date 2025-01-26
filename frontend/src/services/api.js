const BASE_URL = "https://api.spotify.com/v1"


export const getPopularMusics = async (token) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/browse/new-releases`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`API error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        return data.albums ? data.albums.items : [];
    } catch (error) {
        console.error("New Releases Fetch Error:", error);
        return [];
    }
};

export const searchMusics = async (query, token) => {
    var searchParameters = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    var artistID = await fetch(`${BASE_URL}/search?q=` + query + '&type=artist', searchParameters)
        .then(response => response.json())
        .then(data => {return data.artists.items[0].id})

    var albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters) 
        .then(response => response.json())
        .then(data => {return data.items})
    
    return albums
        
};