import { LOCAL_STORAGE_KEY, SELECTED_OPTION } from "../constant";
import { CategoryOptionType, RestaurantType, SortType } from "../type";
import { renderRestaurantList } from "../component/restaurantList";
import { getAllRestaurantsInLocalStorage } from "./localStorageController";
import { $ } from "../util/selector";
import { controlRestaurants } from "../domain/restaurantInfoModalController";
const { All_CATEGORIES, NAME, DISTANCE } = SELECTED_OPTION;
const { CATEGORY, SORT } = LOCAL_STORAGE_KEY;

const sortByName = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
};

const sortByDistance = (allRestaurants: RestaurantType[]) => {
  return allRestaurants.sort((a, b) => Number(a.distance) - Number(b.distance));
};

const filterCategory = (selectedCategory: CategoryOptionType) => {
  const restaurantList = $("#favorite-restaurant")?.classList.contains(
    "clicked-viewer-button"
  )
    ? filterFavoriteRestaurant()
    : getAllRestaurantsInLocalStorage();

  if (selectedCategory === All_CATEGORIES) return restaurantList;

  return restaurantList.filter(
    (restaurant) => restaurant.category === selectedCategory
  );
};

const filterFavoriteRestaurant = () => {
  const restaurantList = getAllRestaurantsInLocalStorage();
  return restaurantList.filter(
    (restaurant) => restaurant.favorite === "favorite"
  );
};

const sortRestaurantList = (
  selectedSort: SortType,
  filteredRestaurantList: RestaurantType[]
) => {
  if (selectedSort === NAME) {
    return renderRestaurantList(sortByName(filteredRestaurantList));
  }

  if (selectedSort === DISTANCE) {
    return renderRestaurantList(sortByDistance(filteredRestaurantList));
  }
};

export const updateRestaurantList = () => {
  const filteredRestaurantList = filterCategory(
    localStorage.getItem(CATEGORY) as CategoryOptionType
  );

  sortRestaurantList(
    localStorage.getItem(SORT) as SortType,
    filteredRestaurantList
  );

  controlRestaurants();
};
