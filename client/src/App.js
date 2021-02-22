import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
//import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";

import { isAuthenticated } from "./apis";
import Header from "./components/header/Header";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { GlobalStyle } from "./global.styles";

//import { selectCurrentUser } from "./redux/user/user.selectors";
//import { checkUserSession } from "./redux/user/user.actions";
import Home from "./pages/home/home";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const EntryPage = lazy(() => import("./pages/entry/entry"));
const PatientStatus = lazy(() => import("./pages/status/status"));
const Exit = lazy(() => import("./pages/exit/exit"));

const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

// class App extends React.Component {
//   unsubscribeFromAuth = null;
const App = () => {
  //componentDidMount() {
  // const { currentUser } = isAuthenticated();
  //console.log(isAuthenticated());
  //setCurrentUser(userAuth);
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);
  //       userRef.onSnapshot((snapShot) => {
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data(),
  //         });
  //       });
  //     }
  //     setCurrentUser(userAuth);
  //   });
  // }
  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  //};
  const { user } = isAuthenticated();
  useEffect(() => {
    isAuthenticated();
  }, [user]);
  //render() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path="/"
              render={() => (isAuthenticated() ? <HomePage /> : <Home />)}
            />
            <Route
              exact
              path="/signin"
              render={() =>
                isAuthenticated() ? (
                  <Redirect to="/" />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />
            <Route
              render={() =>
                isAuthenticated() ? (
                  <div className="left">
                    <div
                      className="ui visible sidebar inverted vertical menu"
                      style={{ top: 90 }}
                    >
                      <Link to="/" className="item">
                        Insights
                      </Link>
                      <Link to={{ pathname: "/entry" }} className="item">
                        Entry
                      </Link>
                      <Link to={{ pathname: "/status" }} className="item">
                        Patient Status
                      </Link>
                      <Link to={{ pathname: "/exit" }} className="item">
                        Exit
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              }
            />
            <Route exact path="/entry" component={EntryPage} />
            <Route exact path="/status" component={PatientStatus} />
            <Route exact path="/exit" component={Exit} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   /*collectionsArray : selectCollectionsForPreview*/
// });

// // const mapDispatchToProps = (dispatch) => ({
// //   checkUserSession: () => dispatch(checkUserSession()),
// // });

// export default connect(mapStateToProps)(App);

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

//export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default connect(mapStateToProps)(App);
export default App;
