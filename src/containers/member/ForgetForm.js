import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField, forget, initializeForm} from "../../modules/member";
import MemberForm from "../../components/member/MemberForm";
import {withRouter} from "react-router-dom";
import toErrorMessage from "../../lib/error/toErrorMessage";
import Loading from "../../components/common/Loading";


function ForgetForm({history}) {
  const dispatch = useDispatch();

  const {form, forgetLink, found, errorResponse} = useSelector(({member}) => ({
    form: member.forget,
    forgetLink: member.links.forget,
    found: member.found,
    errorResponse: member.errorResponse
  }));
  const [loading, setLoading] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'forget', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {username} = form;
    dispatch(forget(forgetLink, {username}));
    setLoading(true);
  };

  useEffect(() => {
    if (found) {
      history.push('/login');
    }
  }, [found, history]);

  useEffect(() => {
    if (errorResponse) {
      setErrorMessage(toErrorMessage(errorResponse));
    }
  }, [errorResponse]);


  useEffect(() => {
    return () => {
      dispatch(initializeForm('forget'));
    }
  }, [dispatch]);


  return loading ? <Loading/> : (
    <MemberForm
      type="forget"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
}


export default withRouter(ForgetForm);
