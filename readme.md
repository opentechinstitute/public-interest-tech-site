# About this website

This is the site for the Public Interest Technology Project, a participatory action research project led by [Research Action Design](rad.cat) and supported by the [Open Technology Institute](https://opentechinstitute.org) at [The New America Foundation](https://newamerica.org). It was developed by [Maya Wagoner](https://github.com/mayawagon)

## Setup

Make sure your dependencies are installed:

    npm install -d
    npm install webpack -g
    npm install webpack-dev-server -g

For development, run the webpack server and sass:

    webpack-dev-server --progress --colors
    sass --watch css/main.sass:css/main.css

Yay! You can now get to it by navigating to localhost:8080 in a browser. 

When you're ready for production, build the site:

    npm run build

## How do I start messing with it?

The main places you're going to want to look are app/App.js, app/Render.js, and (just to check that everything's working) main.bundle.js. 

Index.html might also be helpful. 

If you look in app/App.js, you'll see a constant called SPREADSHEET_ID. That's the unique identifier of the spreadsheet the data is being pulled from. In this case, it's [https://docs.google.com/spreadsheets/d/1jwM-cYI1Ep9ZjNxGDjJXjqNkYA-f1ViyAH-Bv1tLvV4/edit#gid=0](https://docs.google.com/spreadsheets/d/1jwM-cYI1Ep9ZjNxGDjJXjqNkYA-f1ViyAH-Bv1tLvV4/edit#gid=0). The names of the columns are important, so don't change them wihtout changing them in app/App.js and app/Render.js as well (e.g. if you want to change the column Vegetables (y/n) in the spreadsheet, do a ctrl+f in App.js for vegetablesyn and change it everywhere it shows up there as well).

If you want to use a google spreadsheet in this way, you have to not only make it public, but also go to File > Publish to the Web > Publish (default settings are fine). 

If you want to change basic styling things, like colors and fonts, go to css > main.sass and update it there. But make sure your sass compiler is running so that it gets turned into valid CSS! If it's not, run:

sass --watch css/main.sass:css/main.css

## Many thanks to togetherlist

This site is based on [togetherlist](http://togetherlist.com/).

It uses Webpack to bundle up: [Webpack](https://webpack.github.io/docs/tutorials/getting-started/).

If you need more help than is provided here, look into those Webpack tutorials! And/or, reach out to [maya@opentechinstitute.org](mailto:maya@opentechinstitute.org).
