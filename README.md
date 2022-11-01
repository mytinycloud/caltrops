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

On push to the `deploy/char-sheet` branch, the app within `char-sheet` will be published to [caltrops.tlembedded.com](caltrops.tlembedded.com).

1. The app is synced to a [S3 bucket](http://caltrops-bucket.s3-website-ap-southeast-2.amazonaws.com/)
2. The bucket is delivered via [cloudfront distribution](https://d1k7birsgcogal.cloudfront.net)


# FVTT module

The FVTT module is in the working directory [fvtt](./fvtt/)

This is a module for the Foundry Virtual Table Top system.

Foundry support it not well known, and has only been tested on `v10+`.

## Installation

The manifest URL for foundry installation is:
```
https://github.com/Lambosaurus/caltrops/releases/download/fvtt-latest/module.json
```

## Manual installation

If manual install is required, download the [module.zip](https://github.com/Lambosaurus/caltrops/releases/download/fvtt-latest/module.zip). This should be unzipped into your foundry modules directory and renamed to `fvtt-caltrops`.

> Ie, the manifest.json will be located at `/data/modules/fvtt-caltrops/manifest.json`

## Deployment

On push to the `deploy/fvtt` branch, module source is zipped and uploaded to the tag `fvtt-latest`.

This is the permanent home of the fvtt module, and serves as a download source.

