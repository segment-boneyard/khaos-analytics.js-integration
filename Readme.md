
# khaos-analytics.js-integration

A [Khaos](https://khaos.io) template that lets you quickly get started with writing a new integration for [Analytics.js](https://github.com/segmentio/analytics.js).

## Installation

    $ khaos --save segmentio/analytics.js-integration

## Usage

    $ khaos analytics.js-integration google-analytics
    
    $ What's your integration's name?: (eg. "Google Analytics") asdkm
    $ Does your library always record a pageview when loaded?: ("yes" or "no", most do) no
    $ Do we need to wait for your library to load to send it data?: ("yes" or "no", most don't) no
    $ Does your integration record a visitor's identity?: ("yes" or "no") yes
    $ Does your integration record accounts or organizations?: ("yes" or "no") no
    $ Does your integration track a visitor's actions?: ("yes" or "no") yes

## License

MIT