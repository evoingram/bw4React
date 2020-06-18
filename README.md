[![Maintainability](https://api.codeclimate.com/v1/badges/aaf684998357f6c7364c/maintainability)](https://codeclimate.com/github/evoingram/bw4React/maintainability)

# React Support Ticketing System (DevDesk) Product Overview

## Project Description

[Deployed Project](https://devdeskelireact.now.sh/)

This is my old React I build week project, which previously only had a local back end, but since I did the back end for this same project, i decided to hook it up instead of keeping the localhost links on it!

Still work in progress; haven't done update/put stuff yet.  But everything else works great.  Helpers can see their assigned tickets as well as the queue, and students can create tickets and view tickets they've created.  Helpers who are also students can see both.  You can view your profile but not edit it yet.

Students at Lambda School need a place where they can escalate their concerns and receive help. This app will allow an admin to manage help desk tickets that come in from Lambda School Students. It also allows students to submit a help desk ticket, categorize it and post it to the help channel. 

## Key Features

- Live solo project
- (MVP) As a `student` I want to login and have the ability to see `tickets` that are currently open for help.
- (MVP) As a `student` I want to be able to create a new `help ticket` with a `title`, `description`, `what I've tried` and a `category` (ex: React).
- (MVP) As a `helper` I want to be able to login and see a list of open tickets. 
- (MVP) As a `helper` I want to be able to assign a `ticket` to myself by clicking a "help student" button.
- (MVP) As a `helper` I want to be able to mark the `ticket` as "resolved", or re-assign the `ticket` back to the `queue` if I cannot resolve it.
- (Stretch) A user can be both a `student` and a `helper`.

## Tech Stack

Front end deployed to `Vercel` and built using:

- [React](https://reactjs.org/): ReactJS is an open-source JavaScript library which is used for building user interfaces specifically. for single page applications. It's used for handling view layer for web and mobile apps. React also allows us to create reusable UI components.
- [Redux](https://redux.js.org/):  predictable state container for JavaScript apps.
- [Styled Components](https://styled-components.com/):  visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress.
- [Axios](https://github.com/axios/axios):  promise-based HTTP client for both browser and node.js.
- [Yup](https://github.com/jquense/yup):  dead simple object schema validation.
- [Formik](https://github.com/jaredpalmer/formik):  build forms in React, without the tears.

## Available Scripts 

in the project directory, you can run: 

### `npm start`

## APIs

[BACK END](https://github.com/evoingram/bw4)
   
## Testing

- Cypress testing will be completed in a future release.

## Documentation

### [BW4 SCHEMA](https://dbdesigner.page.link/urgi8jQCzNMRBtiX8)   |   [POSTMAN DOCUMENTATION](https://documenter.getpostman.com/view/6401823/SzKbLvH5?version=latest#13325605-4e44-4804-8593-4c9acbb0e929)
