# Caltrops

This repo contains content for the Caltrops TTRPG ruleset.

# Character sheet

The character sheets is available as a webapp. The working directory is [char-sheet](./char-sheet/).

This is build using React, DaisyUI and deployed to a S3 bucket.

Next steps are listed in [issues](https://github.com/Lambosaurus/caltrops/issues). Feel free to contribute to these.

## Develop

Run `npm start` to debug the app.

Run `npm run build` for a production compilation.

## Deployment

On push to the `deploy` branch, the app within `char-sheet` will be deployed to [S3](
http://caltrops-bucket.s3-website-ap-southeast-2.amazonaws.com/)

