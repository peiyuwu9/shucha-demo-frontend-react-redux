import {
  LOADING_USER,
  LOGIN_USER,
  LOGOUT_USER,
  MARK_NOTIFICATIONS_READ,
  SET_USER,
  USER_LIKE_POST,
  USER_UNLIKE_POST,
} from "./userTypes";

const initialState = {
  isLogin: false,
  loading: false,
  userDetails: {},
  likes: [],
  notifications: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER:
      return {
        ...state,
        isLogin: true,
      };

    case LOGOUT_USER:
      return { ...initialState };

    case MARK_NOTIFICATIONS_READ:
      const findNotificationIndex = function (notifications) {
        for (let i = 0; i < notifications.length; i++) {
          if (notifications[i].notificationId === action.payload) return i;
        }
      };
      const notificationIndex = findNotificationIndex(state.notifications);
      state.notifications[notificationIndex].read = true;
      return {
        ...state,
      };

    case SET_USER:
      return {
        isLogin: true,
        loading: false,
        ...action.payload,
      };

    case USER_LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            postId: action.payload.postId,
            userName: action.payload.userName,
            userId: action.payload.userId,
            title: action.payload.title,
            price: action.payload.price,
            imageUrl: action.payload.imageUrl,
          },
        ],
      };

    case USER_UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      };

    default:
      return state;
  }
};
export default userReducers;
