# mydocpad

Empty, pre-customized, docpad project to generate multilingual static web sites,
suitable for AWS S3 hosting.

## Installing and launching

    ./run.sh

## CSS Framework

For the moment, Bootstrap 3 is the default.

## Exporting to S3

First, ensure your credentials are set correctly, and the target bucket exists
and is correctly setup in s3tools/export2s3.js.

If you use your own DNS, you amy want to check it is correctly set up.

Then, execute :

    ./export2s3.sh

Your site will be automatically configured for webhosting and public access.

If access is denied, check that your AWS user has at least the policy
displayed on the terminal by ./export2s3.sh.
