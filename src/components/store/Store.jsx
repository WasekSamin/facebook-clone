import create from "zustand";

export const APIStore = create((set) => ({
  MYAPI: "http://localhost:8000",
}));

export const TokenStore = create((set) => ({
  token: "a0d4b4c5c15762dc34c5ae6f37e217fa8b0a49cb",
  updateToken: (token) =>
    set((state) => ({
      token: token,
    })),
}));

export const SocketStore = create((set) => ({
  socket: null,
  updateSocket: (socket) =>
    set((state) => ({
      socket: socket,
    })),
}));

export const AccountStore = create((set) => ({
  accounts: [],
  addAllAccounts: (accounts) =>
    set((state) => ({
      accounts: accounts,
    })),
  addAccount: (account) =>
    set((state) => ({
      accounts: [account, ...state.accounts],
    })),
  updateAccountData: (account) =>
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.uid === account.uid
          ? {
              ...acc,
              username: account.username,
              address: account.address,
              gender: account.gender,
              working_status: account.working_status,
              working_at: account.working_at,
              job_position: account.job_position,
              studying_at: account.studying_at,
              phone_no: account.phone_no,
              relation_status: account.relation_status,
              char_updated_at: account.char_updated_at,
            }
          : acc
      ),
    })),
  updateAccountProfilePic: (account) =>
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.uid === account.uid
          ? { ...acc, current_profile_pic: account.current_profile_pic }
          : acc
      ),
    })),
  removeAccount: (accountUid) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.uid !== accountUid),
    })),
  isUserLoggedIn: false,
  updateIsUserLoggedIn: (isLoggedin) =>
    set((state) => ({
      isUserLoggedIn: isLoggedin,
    })),
  loggedInUserInfo: null,
  updateLoggedInUserInfo: (user) =>
    set((state) => ({
      loggedInUserInfo: user,
    })),
}));

export const PostStore = create((set) => ({
  allPosts: [],
  addAllPosts: (posts) =>
    set((state) => ({
      allPosts: posts,
    })),
  addNewPost: (post) =>
    set((state) => ({
      allPosts: [post, ...state.allPosts],
    })),
  removePost: (postUid) =>
    set((state) => ({
      allPosts: state.allPosts.filter((post) => post.uid !== postUid),
    })),
  updatePostAccountData: (account) =>
    set((state) => ({
      allPosts: state.allPosts.map((post) =>
        post.user.uid === account.uid
          ? {
              ...post,
              user: {
                ...post.user,
                username: account.username,
                address: account.address,
                gender: account.gender,
                working_status: account.working_status,
                working_at: account.working_at,
                job_position: account.job_position,
                studying_at: account.studying_at,
                phone_no: account.phone_no,
                relation_status: account.relation_status,
                char_updated_at: account.char_updated_at,
                current_profile_pic: account.current_profile_pic,
              },
            }
          : post
      ),
    })),
}));

export const ProfileStore = create((set) => ({
  currentProfile: null,
  updateCurrentProfile: (profile) =>
    set((state) => ({
      currentProfile: profile,
    })),
  currentProfileAllPosts: [],
  addCurrentProfileAllPosts: (posts) =>
    set((state) => ({
      currentProfileAllPosts: posts,
    })),
  addPostToCurrentProfile: (post) =>
    set((state) => ({
      currentProfileAllPosts: [post, ...state.currentProfileAllPosts],
    })),
  canCurrentProfileEditable: false,
  updateCanCurrentProfileEditable: (editable) =>
    set((state) => ({
      canCurrentProfileEditable: editable,
    })),
  loadingFriendOption: true,
  updateLoadingFriendOption: (action) =>
    set((state) => ({
      loadingFriendOption: action,
    })),
  checkProfileFriendOptionWithUser: {
    friend: false, // If user is friend with the current profile
    sendFriendRequest: false, // If user send friend request to the current profile
    receiveFriendRequest: false, // If user got friend request from the current profile
  },
  updateCheckProfileFriendOptionWithUser: (friendOption) =>
    set((state) => ({
      checkProfileFriendOptionWithUser: friendOption,
    })),
}));

export const FriendStore = create((set) => ({
  // For logged in user
  userFriends: [],
  addUserFriends: (friends) =>
    set((state) => ({
      userFriends: friends,
    })),
  addFriend: (account) =>
    set((state) => ({
      userFriends: [account, ...state.userFriends],
    })),
  removeFriend: (account) =>
    set((state) => ({
      userFriends: state.userFriends.filter(
        (friend) => friend.user.uid !== account.uid
      ),
    })),
}));

export const ChatStore = create((set) => ({
  chatroomObj: null,
  updateChatroomObj: (chatObj) =>
    set((state) => ({
      chatroomObj: chatObj,
    })),
}));