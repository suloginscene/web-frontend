import React, {useEffect} from 'react';
import Navigation from "../components/common/Navigation";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../modules/auth";
import {withRouter} from "react-router-dom";

function NavigationContainer({history}) {
  const dispatch = useDispatch();
  const {jwt} = useSelector(({auth}) => ({
      jwt: auth.jwt
    })
  );

  function onClickLogout() {
    dispatch(logout());
  }

  useEffect(() => {
    if (!jwt) {
      history.push('/');
    }
  }, [jwt, history]);

  return (
    <Navigation
      jwt={jwt}
      onClickLogout={onClickLogout}
    />
  );
}

export default withRouter(NavigationContainer);
