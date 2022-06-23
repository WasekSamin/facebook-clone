import create from "zustand";

export const APIStore = create((set) => ({
  MYAPI: "http://localhost:8000",
}));

export const TokenStore = create((set) => ({
  token: "token f2cee27b58003f55f5af1d54def2190fa9fd3dff",
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
  removeAccount: (accountUid) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.uid !== accountUid),
    })),
  isUserLoggedIn: false,
  updateIsUserLoggedIn: (isLoggedin) => set((state) => ({
    isUserLoggedIn: isLoggedin
  })),
  loggedInUserInfo: null,
  updateLoggedInUserInfo: (user) => set((state) => ({
    loggedInUserInfo: user
  }))
}));


export const UserAccountPhotoStore = create((set) => ({
  userPhotos: [],
  updateUserPhotos: (photos) => set((state) => ({
    userPhotos: photos
  })),
  addUserPhoto: (photo) => set((state) => ({
    userPhotos: [photo, ...state.userPhotos]
  })),
  userCurrentProfilePic: null,
  updateUserCurrentProfilePic: (photo) => set((state) => ({
    userCurrentProfilePic: photo
  })),
}))
