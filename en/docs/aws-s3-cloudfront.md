---
title: AWS S3/Cloudfront
name: aws-s3-cloudfront
section: deployment
description: >
    AWS S3 and optionally CloudFront offer a simple and inexpensive way of
    publishing a static website.
---
[% USE q = Qgoda %]
[% USE Highlight %]
If you need more control over your published content, the combination of the
cloud storage service S3 and the content delivery network (CDN) CloudFront
by Amazon Web Services AWS are a popular choice for hosting static sites.

<qgoda-toc/>

## General

We assume that you store your Qgoda sources in a repository on
[GitHub](https://github.com/) and want to use a [GitHub
Action](https://github.com/features/actions) workflow to automatically build
and deploy your content.  The process is very similar as the one described
for [% q.lanchor(name='github-pages') %].

It is assumed that you are familiar with S3 and optionally CloudFront and how
to host a static site with these services. If not, have a look at the blog
post [Authenticating Access to Private Content Hosted with AWS
CloudFront](https://www.guido-flohr.net/authenticating-access-to-private-content-hosted-with-aws-cloudfront/).
That blog post assumes that you want to also limit access to the site but
you can simply skip the sections about authentication if you want to make your
content publicly available.

### Why CloudFront?

CloudFront is a content delivery network. Its main purpose is to make your
content available on multiple servers distributed over the world. Whenever
a visitor hits your site, the AWS name servers will supply an IP address that
is geographically close to the visitor's location.

This feature may not be your priority but CloudFront has the additional
advantage that it uses encrypted connections, whereas web sites only based on
S3 are http-only, and search engines will give a penalty for that. But you
can, of course, just go with S3 if that fits better to your needs.

## Authentication for AWS

The instructions given here follow the recommendations by Amazon for
long-term credentials. There are many other ways to achieve that, see
the documentation for
[`aws-actions/configure-aws-credentials`](https://github.com/aws-actions/configure-aws-credentials)
for a discussion of the different options.

### Create IAM Role

The AWS action
[`aws-actions/configure-aws-credentials`]([`aws-actions/configure-aws-credentials`](https://github.com/aws-actions/configure-aws-credentials)
contain a link to a CloudFormation template. Download the template!

Open the
[AWS CloudFormation Console](https://console.aws.amazon.com/cloudformation/),
click `Create stack` and select `With new resources (standard)`.

In the next screen, select `Choose an existing template` and `Upload a template
file`. Choose the `configure-aws-credentials-latest.yml` from where you have
saved it. Click `Next`!

Specify a stack name like `CreateGitHubActionRole`, enter your GitHub user name
at `GitHubOrg` and the repository name at `RepositoryName`. Click `Next`!

On the next page `Configure stack options` acknowledge that  AWS CloudFormation
might create IAM resources. Leave everything else unchanged and click
`Next`!

Now review your input and click `Submit`.

Wait a minute or so until you see on the next page that one role was created.
Do not worry if you still see `CREATE_IN_PROGRESS` next to other fields.

Now click on the tab `Output` and remember the role ARN.

[% WRAPPER components/infobox.html
           type='warning' title='Other Repositories' %]
If you want to configure a workflow for another repository, do not create a
new stack but re-use the existing one. Select it in the list of stacks,
click `Update` and wait for the next role to be created.
[% END %]

### Give Permissions to IAM Role

Either click on the role link next to the `CREATE_COMPLETE` or log into the
[IAM Console](https://console.aws.amazon.com/iam), select `Roles` and search
for the role.

Click `AddPermissions` and select `Create inline policy`.

Under `Select a service`, enter S3. Under `Actions allowed`, open `List` and
check `ListBucket`.

Under `Resources`, click `Add ARN` to restrict the scope of the permission to
the S3 bucket you are using. Enter the bucket name under `Resource bucket name`
and click `Add ARNs`.

Click `Add more permissions`, select S3 again, and open `Write` under
`Actions Allowed`. This time select `PutObject` and `DeleteObject`. Restrict
the scope again by click `Add ARN`, enter the bucket name under `Resource
bucket name`, enter `*` under `Resource object name` or click `Any object name`
and click `Add ARNs`.

Click `Add more permissions` once again, select CloudFront and open `Write`.
Check `CreateInvalidation`, click `Add ARNs` and enter your CloudFront
distribution id under `Resource distribution`. Now click `Next` and save.

If you click the policy name, the resulting JSON should look like this:

[% FILTER $Highlight "language-json" "line-numbers" %]
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "VisualEditor0",
			"Effect": "Allow",
			"Action": [
				"s3:ListBucket",
				"cloudfront:CreateInvalidation"
			],
			"Resource": [
				"arn:aws:cloudfront::1234567890123:distribution/F2OTX00RQIINAZ",
				"arn:aws:s3:::www.qgoda.net"
			]
		},
		{
			"Sid": "VisualEditor1",
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:DeleteObject"
			],
			"Resource": "arn:aws:s3:::www.my-project.net/*"
		}
	]
}
[% END %]

## Create GitHub Actions Workflow

Create a file `.github/workflows/qgoda.yaml` to define the workflow:

[% FILTER $Highlight "language-yaml" "line-numbers" %]
name: Deploy Docs with Qgoda

on:
  push:
    branches:
      - '**'

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Build with Qgoda
        uses: gflohr/qgoda-action@v1
        with:
          qgoda-version: latest-node
          alpine-dependencies: git

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        if: github.ref == 'refs/heads/main'
        with:
          role-to-assume: arn:aws:iam::1234567890123:role/GitHubActions-Role-LqX8F17nDB4e
          aws-region: us-east-1

      - name: Deploy to S3 Bucket
        uses: osiegmar/s3-publisher-action@v1
        if: github.ref == 'refs/heads/main'
        with:
          bucket: www.my-project.net
          dir: ./packages/docs/_site

      - name: Invalidate CloudFront Cache
        run: aws cloudfront create-invalidation --distribution-id F2OTX00RQIINAZ --paths '/*'
        if: github.ref == 'refs/heads/main'
        shell: sh
[% END %]

The workflow is very similar as the one described under
[% q.lanchor(name='github-pages') %]. Please see there for details!

The first change is in line 9 and 10. It is necessary to give write permissions
for the `id-token`. For `contents` read permissions are sufficient.

In line 29 you must enter the ARN of the role that you have created with the
CloudFormation template.

Change line 36 and 37 to match your S3 bucket name and the qgoda output
directory.

Finally, in line 40, enter the distribution id of your CloudFront
distribution.

The next time you push to your repo, the workflow will build your site
with Qgoda, synch the rendered files into the S3 bucket and finally invalidate
the CloudFront distribution so that visitors will get the update content and
not the content from the cache.
