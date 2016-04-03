import { handleActions } from 'redux-actions'

const reducer = handleActions({
  ADD_FRAGMENT: (state, action) => {
    const {
      id,
      slide
    } = action.payload;

    const s = Object.assign({}, state);
    s.fragments[slide] = s.fragments[slide] || {};
    s.fragments[slide][id] = action.payload;
    s.playingSlide = slide
    s.playingFragment = -1
    return s
  },
  UPDATE_FRAGMENT: (state, action) => {
    const {
      fragment
    } = action.payload;

    const s = Object.assign({}, state);
    s.fragments[fragment.slide][fragment.id].visible = action.payload.visible;
    s.playingFragment = action.payload.visible ? fragment.id : -1
    s.playingSlide = fragment.slide
    return s;
  },
  NEXT_FRAGMENT: (state, action) => {
    const s = Object.assign({}, state);
    s.nextSlide = true
    return s
  },
  NEXT_FRAGMENT_STARTED: (state, action) => {
    const s = Object.assign({}, state);
    s.nextSlide = false
    return s
  }
}, { fragments: {} });

export default reducer;
