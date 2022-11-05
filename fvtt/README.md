# FVTT Caltrops

This module provides caltrops integration between foundry VTT and the caltrops character sheet.

# Usage

Simply locate the new triangle icon on the chat controls, and click it. This will open a connected caltrops instance.

The caltrops character sheet can now forward dice rolls to foundry. The character sheet is intended to be run side-by-side with foundry.

# Installation

The manifest URL for foundry installation is:
```
https://github.com/Lambosaurus/caltrops/releases/download/fvtt-latest/module.json
```

## Manual installation

If manual install is required, download the [fvtt-caltrops.zip](https://github.com/Lambosaurus/caltrops/releases/download/fvtt-latest/fvtt-caltrops.zip). This should be unzipped into your foundry modules directory.

> Ie, the module.json will be located at `/data/modules/fvtt-caltrops/module.json`

## Foundry Version

Foundry support it not well known, and has only been tested on `v10+`. It *may* work on `v9`.

# Development

## Communications

Foundry and Caltrops communicate using the window.postMessage API. This enables cross site communications. The key requirement to enable this is that the caltrops window must be opened via foundry.

## Deployment

On push to the `deploy/fvtt` branch, module source is zipped and uploaded to the tag `fvtt-latest`.

This is the permanent home of the fvtt module, and serves as a download source.