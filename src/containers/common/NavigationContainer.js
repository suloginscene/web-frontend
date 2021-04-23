import React, {useEffect} from 'react';
import Navigation from "../../components/common/Navigation";
import {useDispatch, useSelector} from "react-redux";
import {logout, renew} from "../../modules/member";
import {withRouter} from "react-router-dom";
import toErrorMessage from "../../lib/error/toErrorMessage";

function NavigationContainer({history}) {
  const dispatch = useDispatch();
  const {jwt, refreshToken, renewLink, errorResponse} = useSelector(({member}) => ({
      jwt: member.jwt,
      refreshToken: member.refreshToken,
      renewLink: member.links.renew,
      errorResponse: member.errorResponse
    })
  );

  useEffect(() => {
    if (renewLink && refreshToken) {
      dispatch(renew(renewLink, refreshToken));
    }
  }, [dispatch, refreshToken, renewLink]);

  useEffect(() => {
    if (errorResponse) {
      alert(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);

  useEffect(() => {
    if (!jwt && !refreshToken) {
      history.push('/');
      localStorage.removeItem('refreshToken');
    }
  }, [jwt, refreshToken, history]);

  const onClickLogout = () => dispatch(logout());

  return (
    <Navigation
      jwt={jwt}
      onClickLogout={onClickLogout}
    />
  );
}

export default withRouter(NavigationContainer);
