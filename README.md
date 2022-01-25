# Instructions to run and test the application
There are 3 seperate this applicaiton contains which are
* Frontend
* Backend
* Template

**Frontend** : React.js project folder
**Backend** : All backend routes using laravel
**Template** : Used static html template for design purpose

## How to Run
* First clone the project from github
* Backend:
    * Go to backend directory   
    * `compuser update`
    * `copy .env.example .env`
    * `php artisan key:generate`
    * Now change the value of the key DB_DATABASE= to DB_DATABASE=csv_manipulation at .env
    * Open mysql admin
    * Create a database named csv_manipulation
    * import the file from the root named csv_manipulation.sql
    * Run `php artisan serve`
* Frontend
    * Run `npm start`

**N.B.: all the routes called from the reaact app are stored into src/routes.js**