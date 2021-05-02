import React, {useEffect} from 'react';
import Navigation from "../../components/common/Navigation";
import {useDispatch, useSelector} from "react-redux";
import {logout, renew} from "../../modules/member";
import {withRouter} from "react-router-dom";


function NavigationContainer({history}) {
  const dispatch = useDispatch();

  const {jwt, refreshToken, renewLink} = useSelector(({member}) => ({
    jwt: member.jwt,
    refreshToken: member.refreshToken,
    renewLink: member.links.renew,
  }));


  useEffect(() => {
    if (renewLink && refreshToken) {
      dispatch(renew(renewLink, refreshToken));
    }
  }, [dispatch, refreshToken, renewLink]);


  const onClickLogout = () => dispatch(logout());


  useEffect(() => {
    if (!jwt && !refreshToken) {
      history.push('/');
      localStorage.removeItem('refreshToken');
    }
  }, [jwt, refreshToken, history]);


  return (
    <Navigation
      jwt={jwt}
      onClickLogout={onClickLogout}
    />
  );
}


export default withRouter(NavigationContainer);
