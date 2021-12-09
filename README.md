# Lyrics Search API

### You can search songs and get the lyrics of any song.

<hr>

First, install nodejs(14+), then clone this repository.

<br>

Go inside the directory and run the following commands.

```
1. npm install
2. npm start
```

Server will start listening on port 3001 ... Inside index.js file you can change cors origin to your desird port, if your client port is not 3000.

## Search Songs

Endpoint:-

```
http://localhost:3001/search?name={song_name}
```

You will receive an array of objects. Every object will contain a title, subtitle and a <em>url</em>.

## Get lyrics

Endpoint:-

```
http://localhost:3001/lyrics?url={url}
```

You will receive an object with the lyrics.

<hr>

### [END]

### Used cheerio, axios, express... If you find this useful, leave a star.
