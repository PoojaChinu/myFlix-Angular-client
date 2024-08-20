## MyFLixAngular

Welcome to MyFlixAngular, a portfolio project showcasing my skills in building Angular application. This project serves as a client for the Movie API, displaying movie data with a user-friendly interface using Angular Material.

## Key Features

- **Welcome View:** The app displays a welcome view allowing users to log in or register an account.

- **Authentication:** Authenticated users can view all movies.

- **Single Movie View:** Clicking on a movie displays additional details in a single movie view.

- **Director View:** Users can access details about the director of the selected movie by clicking a button.

- **Genre View:** Users can access details about the genre of the selected movie by clicking a button.

- **Synopsis:** Users can access details about the synopsis of the selected movie by clicking a button.

## Live Demo

You can view the live demo of the myFlix-Angular at: [myFlix-Angular Live Demo](https://poojachinu.github.io/myFlix-Angular-client/welcome)

## Technologies

- Angular: A powerful web application framework.
- Angular Material: A UI component library for Angular applications.
- RxJS: A library for reactive programming using Observables.

## Project Highlights

- One-Page Layout: The application follows a one-page layout, providing a seamless and intuitive user experience.
- Google Material Design: Leveraging Angular Material for a visually appealing and responsive design.

## Getting Started

1. Clone the repository: git clone https://github.com/PoojaChinu/myFlix-Angular-client
2. Install dependencies: npm install
3. Run the comand for a dev server and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

   ng serve --port 8080

## Deployment

Deploy your application to GitHub Pages.

- Create a new repository on GitHub

- In your terminal, run this command (replace `username` and `repository-name` with your data):

       git remote add origin https://github.com/<GitHub-username>/<repository-name>.git

- Add angular-cli-ghpages by running

       ng add angular-cli-ghpages

- To build your application, run the command (replace <repository-name> with your own repository name)

       ng deploy --base-href=/<repository-name>/

- The URL of your application will be then `https://<GitHub-username>.github.io/<repository-name>/`

Whenever you make any changes to your application's code, all you need to do is run the command:

       ng deploy --base-href=/<repository-name>/
