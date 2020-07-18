import {
  CLEAR_POST,
  LIKE_POST,
  LOADING_ALL_POSTS,
  LOADING_SINGLE_POST,
  DELETE_POST,
  SET_NEW_POST,
  SET_POST,
  SET_POSTS,
  SUBMIT_COMMENT,
  UNLIKE_POST,
} from "./dataTypes";

const initialState = {
  post: { comments: [], postId: "" },
  posts: [],
  loadingAllPosts: false,
  loadingSinglePost: false,
};

const dataReducers = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_POST:
      return {
        ...state,
        post: initialState.post,
      };

    case LIKE_POST:
    case UNLIKE_POST:
      const findLikePostIndex = function (posts) {
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].postId === action.payload.postId) return i;
        }
      };
      const likePostIndex = findLikePostIndex(state.posts);
      state.posts[likePostIndex] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post.likeCount = action.payload.likeCount;
      }
      return {
        ...state,
      };

    case LOADING_ALL_POSTS:
      return {
        ...state,
        loadingAllPosts: true,
      };

    case LOADING_SINGLE_POST:
      return {
        ...state,
        loadingSinglePost: true,
      };

    case DELETE_POST:
      const findDeletePostIndex = function (posts) {
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].postId === action.payload) return i;
        }
      };
      const deletePostIndex = findDeletePostIndex(state.posts);
      state.posts.splice(deletePostIndex, 1);
      return {
        ...state,
      };

    case SET_NEW_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loadingAllPosts: false,
      };

    case SET_POST:
      return {
        ...state,
        post: action.payload,
        loadingSinglePost: false,
      };

    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingAllPosts: false,
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };

    default:
      return state;
  }
};

export default dataReducers;
