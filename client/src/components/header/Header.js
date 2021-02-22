// import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";

// import Spinner from "./components/spinner/spinner.component";
// import ErrorBoundary from "./components/error-boundary/error-boundary.component";

// const Header = () => {
// return (
//     <div classNameName="ui secondary pointing menu">
//       <Suspense fallback={<Spinner />}>
//         <Route to="/" classNameName="item">
//           Logo
//         </Route>
//         <div classNameName="right menu">
//           <Route
//             exact
//             path="/signin"
//             render={() =>
//               currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
//             }
//           />
//         </div>
//         <div className="left">
//           <div
//             className="ui visible sidebar inverted vertical menu"
//             style={{ top: 40 }}
//           >
//             <a className="item">Insights</a>
//             <a className="item">Entry</a>
//             <a className="item">Patient Status</a>
//             <a className="item">Exit</a>
//           </div>
//         </div>
//       </Suspense>
//     </div>
// );
// };

import React, {useEffect, Fragment} from "react";
import {Redirect, Link} from "react-router-dom";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

// import { selectCartHidden } from "../../redux/cart/cart.selectors";
// import { selectCurrentUser } from "../../redux/user/user.selectors";
// import { signOutStart } from "../../redux/user/user.actions";
import {isAuthenticated, signout} from "../../apis";

import {ReactComponent as Logo} from "../../assets/Vebed_Logo.svg";

import { LogoContainer, OptionsContainer, OptionLink} from "./header.styles";

const Header = () => {
    const performRedirect = () => {
        return <Redirect to="/"/>;
    };
    const {user} = isAuthenticated();
    useEffect(() => {
        isAuthenticated();
    }, [user]);

    return (
        <div className="ui secondary menu" style={{position:"fixed"}}>
            <Link>
                <LogoContainer to="/">
                    <Logo className="logo"/>
                </LogoContainer>
            </Link>
            <div className="right menu" style={{right:"0px",position:"fixed"}}>
                <Link>
                    <Fragment>
                        <OptionsContainer> {
                            isAuthenticated() ? (
                                <OptionLink to="/#"
                                    onClick={
                                        () => {
                                            signout(() => {
                                                performRedirect();
                                            });
                                        }
                                }>
                                    Logout
                                </OptionLink>
                            ) : (
                                <OptionLink to="/signin">Login</OptionLink>
                            )
                        } </OptionsContainer>
                    </Fragment>
                </Link>
            </div>
        </div>
    )
}

// const mapStateToProps = createStructuredSelector({
// currentUser: selectCurrentUser,
// //hidden: selectCartHidden,
// });

// const mapDispatchToProps = (dispatch) => ({
// signOutStart: () => dispatch(signOutStart()),
// });

// export default connect(mapStateToProps)(Header);
export default Header;
