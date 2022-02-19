import { IPage } from 'interfaces';
import EventTypes from 'server/enums/event-types.enum';
import { Socket } from 'socket.io-client';

const initialState = {
  currentPage: null,
  items: [],
};

// Types
const Types = {
  SET_PAGES: 'DECK/PAGES/SET_PAGES',
  SET_CURRENT_PAGE: 'DECK/PAGES/SET_CURRENT_PAGE',
};

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.SET_PAGES: {
      return { ...state, items: action.pages };
    }
    case Types.SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    default:
      return state;
  }
};

// Actions
export const setPages = (pages: Array<IPage>) => {
  return { type: Types.SET_PAGES, pages };
};

export const setCurrentPage = (currentPage: IPage) => {
  return { type: Types.SET_CURRENT_PAGE, currentPage };
};

// Thunks
export const createPage = (newPage: IPage) => {
  return (dispatch: any, _getState: any, socket: Socket) => {
    dispatch(setCurrentPage(newPage));
    socket.emit(EventTypes.PAGES.CREATE, newPage);
  };
};

export const deletePage = (page: IPage) => {
  return (_dispatch: any, _getState: any, socket: Socket) => {
    socket.emit(EventTypes.PAGES.DELETE, page);
  };
};

export default reducer;
