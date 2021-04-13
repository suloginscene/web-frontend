import React, {useEffect} from 'react';
import Navigation from "../../components/common/Navigation";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../modules/member";
import {withRouter} from "react-router-dom";

function NavigationContainer({history}) {
  const dispatch = useDispatch();
  const {jwt} = useSelector(({member}) => ({jwt: member.jwt}));

  const onClickLogout = () => dispatch(logout());

  useEffect(() => {
    if (!jwt) {
      history.push('/');
      localStorage.removeItem('jwt');
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
