# exercise-demo-stacks

Send traffic to the stacks deployed in the demoware account.  This is driven by
timers.

CRUD stacks are exercised by hitting each API during each invocation.  An error
is generated by sending malformed user data to the create api.

Note that the exerciser function runs the image-processing stacks by depositing
an image into their input object stores.  The image is included in the deployment
package with the exerciseImageProcessing function.  The exerciseImageProcessing
function needs write access to those S3 buckets, but since references to other
stacks' object stores are not working at the moment, the additional permissions
were hand-coded into template.yaml.

The list of url's for CRUD exercise and the list of S3 Buckets for image
exercise must be included in the stack environment:

```json
{
  "buckets": [
    "stackery-12345-objectstore1234abc",
    "stackery-54321-objectsotre5432abc"
  ],
  "urls": [
    "https://abcd.execute-api.us-east-1.amazonaws.com/dev_us_east_1/users",
    "https://xyzz.execute-api.us-east-1.amazonaws.com/dev_us_east_1/users"
  ]
}
```
