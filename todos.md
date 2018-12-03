---
title: ToDos
---
# TODOs imperia "container ready"

## Structure

### Problem

The container directory `/site` should be:

* writable from outside (config, docs, users, ...)
* hidden from outside (code)
* readonly from outside (views, ...)

### Solution: split Up `site`

* /lib (code)
* /share (ro data)
* /site (everything else)

### Imperia Module

* move everything under `Imperia::`
* install imperia as a module with Dist::Zilla

### Consequences

* only one imperia version perl Perl, or
* "imperiabrew"
* or run in container

### "Smooth" Migration

* `SITE-DIR`, `LIB-DIR`, `SHARED-DIR` should
all default to `/site`
* default values not written to `system.conf`
* non-default values only settable via cli
  options

### Document Root

Apache, nginx, ...:

* alias for `/imperia` into Perl installation

`site_imperia.pl`:

* write a special handler

### `site/bin`:

Best: Vanish! Replace with REST API.

V1: Thin wrapper around `system()`.

### `site/bin`:

Alternative: Put all scripts into `$PATH`.

### Container:

* should be compatible to Docker 1.x
  (rationale: K8s resp. OpenShift)
* base-image: perl-5.x
* requires `dumb-init` (CTRL-C ...)
* should only share site directory
* Buildah!?

### Container:

* base layer/image `imperia`
* `site_imperia.pl` layer on top
* `site_hermes.pl` layer on top:
* `script` layer on top for other scripts;
  the script is the first argument
* default orchestration with docker-compose
  or docker swarm

### Other Systems ...

* Sympa. Deployment via Ansible.
* OTRS?

## Search

### JSON Export

Make DocTree exportable as JSON.

### Elastic

Separate container with elastic.

## Cloud Deployment

### Develop System

No-brainer when containerized

### Live System

* no hermes
* no dynamics
* pre-generation of system services
  in mirror container
* rsync from container to static site
