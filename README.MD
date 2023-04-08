
# Microspoce Backend
This is the backend of the microscope problem which helps simulate a remote microscope.

---
## Requirements

For development, you will only need Node.js and a node global package, and npm installed in your environement.

### Node

- #### Node installation
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).


## Install

    $ git clone <THIS REPO>
    $ cd microscope-backend
    $ npm install

## Configure app

In the root folder you can edit config.js to change:

- PORT: Default is set to 4000;
- MAX_MACHINE: Not being actively used, just created to play with extended version of problem;

## Running the project

    $ node server.js

## Assumptions
Following assumptions were taken while solving the problem:
- The start point will be (0,0) in CS terms and (1,1) on pathologist slide shown on UI
- The starting point won't be marked as visited initially, only if we visit it again it will be marked as visited and other operation will happen
- Machine (in this case backend) is source of truth, if miscofiguration happens at any place (only frontend in this case) will sync with backend.

## Class Diagram