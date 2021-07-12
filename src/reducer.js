export const initialState = {
    user: null,
    featuredPlaylist: [],
    currentSongPlaying: {},

    //remove after finished developing
    //token: "BQA0mbpJXoFI50icHk7pPqZcXzHHSEIr7lr60Msix0NUQAQwlnGSypPC10CyhVsRndrX4jKyZ2O9GlVumP2WGj_aT3xqSY3i6SIje9CleuJmVJmvWaD-0kZlOpDovz60EvWe9H-3-GM9pvUH6CqLLHRfZwBuZPXRrjIATvIqhOf6U99r3Luj",
};
export const actionTypes = {
    SET_USER: "SET_USER",
    SET_FEATURED_PLAYLISTS: "SET_FEATURED_PLAYLISTS",
    SET_CURRENT_SONG: "SET_CURRENT_SONG",
};
// Reducer Job: receive actions from the user and perform the actions and push the action data
// into the state(initialState) for the data layer to consume
const reducer = (state, action) => {
    console.log(
        "Reducer: Setting the incoming api data into the data layer context"
    );
    console.log(action);
    //action has 2 types-> type, [payload]
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        case "SET_FEATURED_PLAYLISTS":
            return {
                ...state,
                featuredPlaylist: action.featuredPlaylist,
            };
        case "SET_CURRENT_SONG":
            return {
                ...state,
                currentSongPlaying: action.currentSongPlaying,
            };

        default:
            return state;
    }
};
export default reducer;