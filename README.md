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

You can use the following (minimal) AWS-IAM policy :

    {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:GetBucketWebsite",
                "s3:PutBucketWebsite"
            ],
            "Resource": "arn:aws:s3:::bbbbbbbb
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::bbbbbbbb/*"
        }
    ]
    }
    
... where bbbbbbbb is replaced with the bucket name (eg : "test.mybucket.com" )

If you use your own DNS, you amy want to check it is correctly set up.

**configure s3tools/export2s3.conf**

Then, execute :

    ./export2s3.sh

Your site will be automatically configured for webhosting and public access.

If access is denied, check that your AWS user has at least the policy
displayed on the terminal by ./export2s3.sh.
