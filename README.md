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

On push to the `deploy` branch, the app within `char-sheet` will be published to [caltrops.tlembedded.com](caltrops.tlembedded.com).

1. The app is synced to a [S3 bucket](http://caltrops-bucket.s3-website-ap-southeast-2.amazonaws.com/)
2. The bucket is delivered via [cloudfront distribution](https://d1k7birsgcogal.cloudfront.net)
