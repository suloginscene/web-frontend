import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm} from "../modules/auth";
import AuthForm from "../components/auth/AuthForm";

function ForgetForm() {
  const dispatch = useDispatch();
  const {form} = useSelector(({auth}) => ({form: auth.forget}));

  const onChange = (e) => {
    const {name, value} = e.target;
    dispatch(changeField({form: 'forget', key: name, value: value}));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO
    console.log("should impl");
  };

  useEffect(() => {
    dispatch(initializeForm('forget'));
  }, [dispatch]);

  return (
    <AuthForm
      type="forget"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default ForgetForm;
