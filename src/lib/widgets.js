import {Router} from "wpe-lightning-sdk";

export default () =>{
    Router.widget("splash")
    Router.widget("home/browse/movies", ["Menu", "Logo"])
    Router.widget("home/browse/series", ["Menu", "Logo"])
    Router.widget("details/:itemType/:itemId", ["Menu", "Logo"])
}
