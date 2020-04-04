# DoorBoard

[![Server Build Status](../../workflows/Server%20Java/badge.svg)](../../actions?query=workflow%3A"Server+Java")
[![Client Build Status](../../workflows/Client%20Angular/badge.svg)](../../actions?query=workflow%3A"Client+Angular")
[![End to End Build Status](../../workflows/End-to-End/badge.svg)](../../actions?query=workflow%3AEnd-to-End)

This is Team Nicolai Thärichen's iteration-one code for the DoorBoard web app,
as part of The UMM CSCI Department's "Software Design and Development" class
(Spring 2020).

🐚 **Teams considering using this code base for iteration two should read
items marked with seashells.**

DoorBoard is a virtual sticky-note board for office dwellers who need a way to
remotely and conveniently post last minute scheduling announcements (or other
information) to visitors.

## Known Issues

Almost all of the code in this repository is in a working state. However, there
a couple of known issues with this project; if you use this code base, you
should fix these for the next iteration.

1. 🐚 The website isn't very legible if your browser is in dark mode. To fix
   this, you may want to change the color of the text on the sticky-notes so
   that it's always black. This change should probably go in the
   `client/src/app/notes.scss` file. (You also probably want to change
   `client/src/app/app.component.scss` so that the background color isn't
   always `whitesmoke`; in dark mode, the background color should probably be
   dark grey.)
2. 🐚 When the user clicks the `GENERATE PDF` button, a PDF file is saved to
   their downloads folder. At the moment, this file doesn't have the `.pdf`
   extension at the end. To fix this, you'll need to change the `savePDF()`
   method in the `client/src/app/home/home.component.ts` file.
3. 🐚 In `server/src/main/java/umm3601/notes/NoteController.java`, the
   methods `editNote()` and `deleteNote()` will throw an exception if the
   path parameter `:id` isn't formatted like a Mongo ID (for example, if
   it isn't a hex string, or if it's got the wrong number of digits). This will
   cause a `500 Internal Server Error`.

## API

🐚 The server's API is a bit weird in places. A full description of
the API is can be found in [HTTP_API.md](HTTP_API.md).

## Deployment

As always, instructions on how to crate a DigitalOcean Droplet and setup the project are in [DEPLOYMENT.md](DEPLOYMENT.md).

🐚 If you want to deploy this project on a new droplet, you will need to
change the domain name in the file
`client/src/environments/environment.prod.ts`. (Specifically, you need to
change the value of `BASE_URL`.) This value is used to generate the link on
the PDF; if you don't change it, the PDF will point to the webpage from
iteration one.


300 Character limit on notes??