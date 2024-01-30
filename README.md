# Motor Mingle - A car buy/sell website

![Website's hero section](./src/assets/heroSection.png)

### Server Side Repo - [Server Side Repository](https://github.com/nahidul-fahim/motor-mingle-server)
### Live site - [Website's live link](https://motor-mingle.web.app)

## Admin login
email: admin@admin.com
password: Asdf$$


# Technologies used:
 1. HTML
 2. CSS
 3. Tailwind CSS
 4. Daisy UI
 5. JavaScript
 6. React.js
 7. React router
 8. Tanstack query
 9. Axios
 10. Tanstack table
 11. Firebase (For authentication + hosting)
 12. JWT (JSON Web Token)

# About the project

## Overview:
 After registration a user can post to sell their old cars and the other registered user can view the listings, place bid on them and can finally buy the car.
 **The website has:**
 * Homepage
 * All listing page
 * Separate dashboard for both admins and users
 * 404 page 

 ## Features:

 ### Homepage:
  * User can use the search form on the hero section to search and filter from all the listings.
  * A dynamic 'Latest car' section where the latest listings are displayed from database
  * A dynamic 'Testimonial' section where the data are coming from database, and I created the testimonial section by myself, no package was used.
  * "The most loved" is another dynamic section where the listing are shown that have most bids.

  ## All Listings:
  * All the listings by all users are shown in that route.
  * User can filter the list using car condition, car brand and, price range.
  * Pagination functionality is also included in that route.
  * If the users

  ## Listing details:
  * On this route, users can see the details about a listing.
  * By clicking on the "save ad", users can bookmark a listing and by clicking on the button again, they can delete the listing.
  * By clicking on the "place a bid" button, a modal will show up, where users can submit a bid for the product.
  * If the product is sold, the "place a bid" button will get hidden.

  ## Sign up & Login page:
  * I created the authentication system using firebase.
  * User can select image from their device for profile photo.
  * Created the hosting image hosting functionality using ImgBB.
  * User can toggle between sign up and login page.
  * The new user data is stored on the database.
  * JWT security implemented.

  ## Admin dashboard:
  * Admin dashboard is secured by admin verifying middleware on the backend and admin verifying route on the frontend.
  * Admin gets automatically redirected to the "Statistics" page. On this page admin can see the amount of listings created in a specific date and status of member verification.
  ### All Users
  * On this route admin can see all the registered members in a tabular form.
  * can verify or decline a user who has requested for profile verification.
  ### All products
  * Admin can see all the listings in a tabular form.
  * The table is created using TanStack table.

  ## User dashboard:
  A normal user can visit the user dashboard and the user gets redirected to the "profile" page.
  ### Profile:
  * Using "Request Verification" button, user can send request to admin to verify their account.
  * Users can update their phone number and address.
  * Can provide rating and feedback to the platform.
  * Those data are saved to database.
  * These feedbacks are shows as testimonials on the homepage.
  ### Sell your car
  * User can post new listing here. The car's image is hosted on ImgBB.
  ### My listings
  * Here users can see the postings they have made.
  * Users Can manage the listing. Update the listing, delete the listing and can mark the product as "Sold".
  * If anyone has placed bid on a listing a "Bids" button will appear, from where user can see all the bids for that listing.
  ### Saved listings
  Here users can those listing that they have bookmarked.


# Your visit, a delightful honor! Thank you!