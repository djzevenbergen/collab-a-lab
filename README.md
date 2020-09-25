![]()
<br />

#### By DJ Zevenbergen

<hr/>

## Decription

A React Web application for music collaboration. <br>
A user can log in, upload mp3 files, and then make a song using those mp3s.
Other users can then listen to that song and upload their own track to that song. 
The owner of the song can then listen to that uploaded track and determine whether or not to keep it as a part of their song.
<br>
This application also has the beginnings of an 8-track mixer that allow the owner to adjust levels of individual tracks and save them. 
<hr />

## Live Site
You can view the live site here. [Collabulous](https://collab-a-lab.web.app)

## Logistics

|                    | Minimum Product Features                                            |
| ------------------ | ------------------------------------------------------------------- |
| :heavy_check_mark: | User can sign up/login/sign out                                               |
| :heavy_check_mark: | User can access the projects github repository from navigation menu |
| :heavy_check_mark: | User can upload an mp3 file                   |
| :heavy_check_mark: | User can create song with any mp3s that they've uploaded        |
| :heavy_check_mark: | User can view other user's songs and propose a new track from a list of their own uploaded mp3s            |
| :heavy_check_mark: | User can view any proposals on their own songs and reject/accept them           |
| :heavy_check_mark: | Accepted tracks get added to the song in the database and then become apart of the song (only on reload as of now)            |
| :heavy_check_mark: | Rejected tracks get removed from the requests collection and list (only on reload as of now)            |
| :heavy_check_mark: | User can view other user's songs and propose a new track from a list of their own uploaded mp3s            |
| :heavy_check_mark: | User can view other user's songs and propose a new track from a list of their own uploaded mp3s            |
|                    | ---------------------------   |

<br/>
<br/>

|                    | Stretch Goals                                           |
| ------------------ | ------------------------------------------------------- |
| :heavy_check_mark: | Hosting                                                 |
| :heavy_check_mark: | Songs can be open in the mixer and listended to                                    |
| :heavy_check_mark: | Individual tracks can be listened to  |
| :heavy_check_mark: | Individual tracks can be stopped  |
| :heavy_check_mark: | Songs can be played         |
| :heavy_check_mark: | Songs can be stopped         |
| :heavy_check_mark: | Song (when played in mixer) uses stored volumes         |
| :heavy_check_mark: | Changing and saving individual track sliders saves volumes        |
|                    | Changing volume sliders changes volume live    |
|                    | Changing volume sliders changes volume live    |
|                    | Mute/Pan/Solo individual tracks and save those settings as well   |
|                    | Changing volume sliders changes volume live    |
|                    | Download tracks    |
|                    | Download an mp3 of a whole song    |



<hr />

## Setup/Installation Requirements

1. Clone this projects repository into your local directory following [these](https://www.linode.com/docs/development/version-control/how-to-install-git-and-clone-a-github-repository/) instructions.

2. Open the now local project folder with [VSC](https://code.visualstudio.com/Download) or an equivalent

3. Navigate to the project directory from your terminal by entering the following:

```
$ cd ~/collab-a-lab
```

4. Within the projects directory install all required dependencies with

```
$ npm install
```

5. Run the application to view in your browser with

```
$ npm run start
```

> If the browser does not automatically launch, view the project [here](https://localhost:3000)

<hr/>

## Known Bugs

- Songs won't stop when played
- Tracks will start and stop just fine unless you play another track. Only the most recently played track will stop
- Deleting a track doesn't delete it from a song
- Deleting a song doesn't delete its settings
- Volume sliders don't affect players when playing
- Accepting/Rejecting a request doesn't remove the request from the DOM
- Volume sliders affect the wrong tracks in the mixer

If you have a bug or an idea, browse the open issues before opening a new one. You can also take a look at the [Open Source Guide](https://opensource.guide/).

<hr/>

## Technologies Used


- JavaScript
- Tone.j
- React
- Firebase
- Firestore
- Reactstrap
- Bootstrap
- HTML
- CSS
- Git

<hr/>

## Legal

#### Apache License V2.0

Copyright 2020 DJ Zevenbergen @ Epicodus

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
