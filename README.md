# React Blog Sample

[![tests](https://github.com/akornatskyy/sample-blog-react-reflux/actions/workflows/tests.yml/badge.svg)](https://github.com/akornatskyy/sample-blog-react-reflux/actions/workflows/tests.yml)
[![Code Climate](https://codeclimate.com/github/akornatskyy/sample-blog-react-reflux/badges/gpa.svg)](https://codeclimate.com/github/akornatskyy/sample-blog-react-reflux)

A simple blog written using [react](http://facebook.github.io/react/) and
[reflux](https://github.com/reflux/refluxjs) demonstrating
unidirectional dataflow architecture.

## Setup

Install dependencies with [npm](https://www.npmjs.com):

    npm i

Build resources for *mock* api strategy:

    npm run build

or *web* (optionally specify web API host):

    API=web npm run build
    API=web HOST=http://api.local:8080 npm run build

## Run

Serve files with a web server (from `build/`):

    npm start

Open your browser at [http://localhost:8080](http://localhost:8080),
use *demo* / *password*.
