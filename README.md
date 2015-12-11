# mydocpad

Empty, pre-customized, docpad project to generate multilingual static web sites,
suitable for AWS S3 hosting.

## Installing and launching

    ./run.sh

## Exporting to S3

First, ensure your credentials are set correctly, and the target bucket is
correctly setup in s3tools/export2s3.js.

Then, execute :

    ./export2s3.sh

For your site to become active, you will need to :

* make everything public in the bucket,
* activate the 'static webhosting' feature,
* optionnaly, set your DNS CName to point to amazon address

See AWS Static Web Hosting for more details.
