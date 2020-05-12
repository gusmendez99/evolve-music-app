import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth/auth.reducer';
import user, * as userSelectors from './user/user.reducer';
import role, * as roleSelectors from './role/role.reducer';
import artist, * as artistSelectors from './artist/artist.reducer';
import genre, * as genreSelectors from './genre/genre.reducer';
import mediatype, * as mediaTypeSelectors from './mediatype/mediatype.reducer';
import album, * as albumSelectors from './album/album.reducer';
import track, * as trackSelectors from './track/track.reducer';
import cart, * as cartSelectors from './cart/cart.reducer';

const reducer = combineReducers({
    auth,
    user,
    role,
    artist,
    album,
    track,
    mediatype,
    genre,
    cart
})

export default reducer;

export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthUserPermissions = state => authSelectors.getAuthUserPermissions(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const isAuthenticated = state => getAuthUser(state) != null;

export const getUser = (state, id) => userSelectors.getUser(state.user, id);
export const getUsers = state => userSelectors.getUsers(state.user);
export const isFetchingUsers = state => userSelectors.isFetchingUsers(state.user);
export const getFetchingUsersError = state => userSelectors.getFetchingUsersError(state.user);

export const getRole = (state, id) => roleSelectors.getRole(state.role, id);
export const getRoles = state => roleSelectors.getRoles(state.role);
export const isFetchingRoles = state => roleSelectors.isFetchingRoles(state.role);
export const getFetchingRolesError = state => roleSelectors.getFetchingRolesError(state.role);

export const getArtist = (state, id) => artistSelectors.getArtist(state.artist, id);
export const getArtists = state => artistSelectors.getArtists(state.artist);
export const isFetchingArtists = state => artistSelectors.isFetchingArtists(state.artist);
export const getFetchingArtistsError = state => artistSelectors.getFetchingArtistsError(state.artist);

export const getGenre = (state, id) => genreSelectors.getGenre(state.genre, id);
export const getGenres = state => genreSelectors.getGenres(state.genre);
export const isFetchingGenres = state => genreSelectors.isFetchingGenres(state.genre);
export const getFetchingGenresError = state => genreSelectors.getFetchingGenresError(state.genre);

export const getMediaType = (state, id) => mediaTypeSelectors.getMediaType(state.mediatype, id);
export const getMediaTypes = state => mediaTypeSelectors.getMediaTypes(state.mediatype);
export const isFetchingMediaTypes = state => mediaTypeSelectors.isFetchingMediaTypes(state.mediatype);
export const getFetchingMediaTypesError = state => mediaTypeSelectors.getFetchingMediaTypesError(state.mediatype);

export const getAlbum = (state, id) => albumSelectors.getAlbum(state.album, id);
export const getAlbums = state => albumSelectors.getAlbums(state.album);
export const isFetchingAlbums = state => albumSelectors.isFetchingAlbums(state.album);
export const getFetchingAlbumsError = state => albumSelectors.getFetchingAlbumsError(state.album);

export const getTrack = (state, id) => trackSelectors.getTrack(state.track, id);
export const getTracks = state => trackSelectors.getTracks(state.track);
export const isFetchingTracks = state => trackSelectors.isFetchingTracks(state.track);
export const getFetchingTracksError = state => trackSelectors.getFetchingTracksError(state.track);

export const getCartTrack = (state, id) => cartSelectors.getCartTrack(state.cart, id);
export const getCartTracks = (state) => cartSelectors.getCartTracks(state.cart)
export const isExecutingCheckout = (state) => cartSelectors.isExecutingCheckout(state.cart);
export const getCheckoutError = (state) => cartSelectors.getCheckoutError(state.cart);
export const getInvoiceLinesStatusCode = (state) => {console.log(cartSelectors.getInvoiceLinesStatusCode(state.cart));  return cartSelectors.getInvoiceLinesStatusCode(state.cart)};