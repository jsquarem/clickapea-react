# Nice Package, Man

An easy way to keep track of and share some of the NPM packages that I've used in various applications. I wanted a way to keep track of these while also providing context around thier use - links to repos where I've used them, and some code snippets to help install, initiallize, and deloy them. Plus any other tips and tricks I maye have learned - links to stackoverflow, etc.

<a href="https://trello.com/b/OC3Bb5jZ/clickapea">Trello board w/ ERD and Wireframes</a>

## Wireframes

<details>
<summary>Homepage</summary>
<img src="https://i.imgur.com/ymcNtFQ.png">
</details>
<details>
<summary>Recipe View</summary>
<img src="https://i.imgur.com/SAjN0Zn.png">
</details>
<details>
<summary>Planner View</summary>
<img src="https://i.imgur.com/HSViDwj.png">
</details>
<details>
<summary>Cart View</summary>
<img src="https://i.imgur.com/BvNRujy.png">
</details>

## How to use

- Navigate to <a href="https://clickapea.herokuapp.com/" target="_blank">https://clickapea.herokuapp.com/</a>
- Login to create an account
- Search for a recipe or add a recipe url
- Add recipe to a recipe book
- Add recipe to a meal planner
- Add recipe to a cart

## Features

- Import recipes from other sites
- Recipe data is downloaded and parsed, cleaned, and displayed
- 100s of sites work with the import
- Alternatively you can search the existing database of recipes
- When you find a recipe you like, you can add it to a recipebook, which will save that recipe to your account.
- You can add recipes in your account to the meal planner and/or generate a shopping list of ingredients for selected recipes

## Technologies

- Node.js
- React.js
- Spoonacular API
- Express
- Bootstrap
- MongoDB with mongoose
