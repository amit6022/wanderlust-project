const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, checkOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);
//category Route
router.get(
  "/category/IconicCity",
  wrapAsync(listingController.ListingIconicCity)
);
router.get("/category/Trending", wrapAsync(listingController.ListingTrending));
router.get("/category/Rooms", wrapAsync(listingController.ListingRooms));
router.get(
  "/category/Mountains",
  wrapAsync(listingController.ListingMountains)
);
//Search Route
router.get("/search", wrapAsync(listingController.SearchListings));

router
  .route("/:id")
  .get(wrapAsync(listingController.ShowListing))
  .put(
    isLoggedIn,
    checkOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, checkOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  checkOwner,
  wrapAsync(listingController.renderEditListing)
);

module.exports = router;
