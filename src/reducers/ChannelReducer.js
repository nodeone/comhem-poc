export default function channels(state = {
  channels: [],
  fetched: false
}, action) {
    //////////////////////////////////////////
    // INITIAL FETCH OF DATA
    //////////////////////////////////////////
    if (action.type === "CHANNELS_FETCHED") {
      return {
        ...state,
        channels: action.payload.channels,
        fetched: true
      }
    }
    return state;
}
