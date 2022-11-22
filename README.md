# Caltrops

This repo contains content for the Caltrops TTRPG ruleset.

# Character sheet

The character sheets is available as a webapp. The working directory is [char-sheet](./char-sheet/).

This is build using React and DaisyUI.

Next steps are listed in [issues](https://github.com/Lambosaurus/caltrops/issues). Feel free to contribute to these.

## Develop

Run `npm start` to debug the app.

Run `npm run build` for a production compilation.

## Deployment

On push to the `deploy/char-sheet` branch, the app within `char-sheet` will be published to [caltrops.tlembedded.com](https://caltrops.tlembedded.com).

1. The app is synced to a [S3 bucket](http://caltrops-bucket.s3-website-ap-southeast-2.amazonaws.com/)
2. The bucket is delivered via [cloudfront distribution](https://d1k7birsgcogal.cloudfront.net)


# FVTT module

This is a module for the Foundry Virtual Table Top system. The working directory is [fvtt](./fvtt/).

The readme for this component is in [/fvtt/README.md](./fvtt/README.md)


# Server

This component provides functionality to store sheets.

The sheet information is stored in DynamoDB, and served by a lambda function.

The server provides the following functions:
 * List sheets owned by a user
 * Read sheets
 * Write sheet

The lambda url is `https://nad7hr2keheheljlwvlkiyjtq40mwgzl.lambda-url.ap-southeast-2.on.aws/`

## Deployment

Currently the contents of [/server/lambda.js](./server/lambda.js) are merely copied and pasted into 

The lambda has been tested using node v14.
