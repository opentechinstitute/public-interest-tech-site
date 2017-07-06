# About this project

This used to be the site for the Public Interest Technology Baseline Project, a participatory action research project led by [Research Action Design](http://rad.cat) and supported by the [Open Technology Institute](https://opentechinstitute.org) at [The New America Foundation](https://newamerica.org). It was developed by [Maya Wagoner](https://github.com/mayawagon). The project name has been changed to the Technology and Social Justice Field Scan, and the website now lives at [t4sj.co](http://t4sj.co/) with the code at [https://github.com/opentechinstitute/tech-for-social-justice](https://github.com/opentechinstitute/tech-for-social-justice).

The repo remains because it contains some important code for the "Search Projects and Organizations" page. 

## Setup

Make sure some dependencies are installed:

    npm install -d
    npm install webpack -g
    npm install webpack-dev-server -g

For development, run the [webpack](https://webpack.github.io/) server and [sass](http://sass-lang.com/):

    webpack-dev-server --progress --colors
    sass --watch css/main.sass:css/main.css

Yay! You can (hopefully) now see the site in action by navigating to localhost:8080 in a browser. 

When you're ready for production, build the site:

    npm run build

## How do I start messing with it?

The main places you're probably going to want to look are app/App.js, app/Render.js, and (just to check that everything's working and bundling up correctly) main.bundle.js. 

Index.html might also be helpful. 

If you look in app/App.js, you'll see a constant called SPREADSHEET_ID. That's the unique identifier of the spreadsheet some of the data is being pulled from. In the case of our orglist page, it's [this spreadsheet of public interest technology projects, companies, and organizations](https://docs.google.com/spreadsheets/d/1jwM-cYI1Ep9ZjNxGDjJXjqNkYA-f1ViyAH-Bv1tLvV4/edit#gid=0). The names of the columns are important, so don't change them wihtout changing them in app/App.js and app/Render.js as well (for example if you want to change the column "Vegetables (y/n)" in the spreadsheet, do a ctrl+f in App.js for "vegetablesyn" and change it everywhere it shows up there as well).

If you want to use your own google spreadsheet in this way, you have to both change the sharing settings to make it public, and go to File > Publish to the Web > Publish (with defaults). 

If you want to change just basic styling, like colors and fonts, go to css > main.sass and update it there. But make sure your sass compiler is running so that it gets turned into valid CSS! If it's not, run:

	sass --watch css/main.sass:css/main.css

## Many thanks to togetherlist!

This site is based on [togetherlist](http://togetherlist.com/), which was created by [Sougwen](http://twitter.com/sougwen), [Raihan](http://twitter.com/raihan_) & [Willow](http://twitter.com/willowbl00) and a bunch of other contributors.

## are u still confused

The site uses Webpack to bundle up: [Webpack](https://webpack.github.io/docs/tutorials/getting-started/).

If you need more help than is provided here, look into those Webpack tutorials! And/or, reach out to [maya@opentechinstitute.org](mailto:maya@opentechinstitute.org).
