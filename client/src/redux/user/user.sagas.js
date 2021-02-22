import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

import {
  signup,
  signin,
  authenticate,
  isAuthenticated,
  signout,
} from "../../apis";

// import {
//   auth,
//   googleProvider,
//   createUserProfileDocument,
//   getCurrentUser
// } from '../../firebase/firebase.utils';

// export function* getSnapshotFromUserAuth(userAuth, additionalData) {
//   try {
//     const userRef = yield call(
//       createUserProfileDocument,
//       userAuth,
//       additionalData
//     );
//     const userSnapshot = yield userRef.get();
//     yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(authenticate);
    //const userSnapshot = yield userRef.get();
    //yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    yield put(signInSuccess(userRef));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// export function* signInWithGoogle() {
//   try {
//     const { user } = yield auth.signInWithPopup(googleProvider);
//     yield getSnapshotFromUserAuth(user);
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

// export function* signInWithEmail({ payload: { email, password } }) {
//   try {
//     const { user } = yield auth.signInWithEmailAndPassword(email, password);
//     yield getSnapshotFromUserAuth(user);
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(signin(email, password));
    //yield getSnapshotFromUserAuth(user);
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// export function* signInWithEmail({ payload: { email, password } }) {
//   try {
//     console.log("i m fired");
//     const { user } = yield signin(email, password);
//     console.log(user);
//     yield call(authenticate(user));
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

// export function* isUserAuthenticated() {
//   try {
//     const userAuth = yield getCurrentUser();
//     if (!userAuth) return;
//     yield getSnapshotFromUserAuth(userAuth);
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

export function* isUserAuthenticated() {
  try {
    const userAuth = yield isAuthenticated();
    if (!userAuth) return;
    //yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// export function* signOut() {
//   try {
//     yield auth.signOut();
//     yield put(signOutSuccess());
//   } catch (error) {
//     yield put(signOutFailure(error));
//   }
// }

export function* signOut() {
  try {
    yield signout();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// export function* signUp({ payload: { email, password, displayName } }) {
//   try {
//     const { user } = yield auth.createUserWithEmailAndPassword(email, password);
//     yield put(signUpSuccess({ user, additionalData: { displayName } }));
//   } catch (error) {
//     yield put(signUpFailure(error));
//   }
// }

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield signup({ displayName, email, password });
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

// export function* signInAfterSignUp({ payload: { user, additionalData } }) {
//   yield getSnapshotFromUserAuth(user, additionalData);
// }

// export function* onGoogleSignInStart() {
//   yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
// }

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

// export function* onSignUpSuccess() {
//   yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
// }

export function* userSagas() {
  yield all([
    //call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    //call(onSignUpSuccess),
  ]);
}
