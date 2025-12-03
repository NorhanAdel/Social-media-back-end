import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import { Alert, Button, Input, SectionTitle } from "../../components";
import { BiShield } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../Componenet";
import {
  resetError,
  resetSuccess,
  updateUserInfo,
} from "../../store/reducer/authenticationSlice";

export const UserProfile = () => {
  const { user, loading, error, successMessage } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: user?.name || "",
    password: "",
  });
  console.log(user);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateHandler = (event) => {
    dispatch(updateUserInfo(dataForm));
  };

  useEffect(() => {
    if (isEditing === false) {
      setDataForm({
        name: user?.name || "",
        password: "",
      });
    }
    return () => {};
  }, [isEditing, user?.name]);

  useEffect(() => {
    const id = setTimeout(() => {
      setOpen(false);
    }, 5000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (successMessage) {
        dispatch(resetSuccess());
      }
    }, 5000);
    return () => {
      clearTimeout(id);
    };
  }, [successMessage, dispatch]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (error) {
        dispatch(resetError());
      }
    }, 5000);
    return () => {
      clearTimeout(id);
    };
  }, [error]);
  if (loading) return <Loading />;
  return (
    <div id="user-profile" className="layout-page">
      <div className="container user-container">
        <main className="rounded white-bg-color">
          <section className="title-section">
            <div className="title-icon">
              <BiShield className="main-color" />
            </div>
            <SectionTitle
              className="right"
              title="المعلومات الشخصيه"
              subTitle="كن حريصا ف التعديل والتغير في معلوماتك والا سوف يتم حظرك"
            />
          </section>
        </main>
        <main className="rounded white-bg-color">
          <div className="content">
            <div className="form-container">
              <form action="" name="user-form" id="user-form">
                <div className="input-field">
                  <label className="custom-label" htmlFor="name">
                    الاسم
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={dataForm.name}
                    readOnly={!isEditing}
                    onChange={changeHandler}
                    onClick={() => setOpen(true)}
                    className={`${!isEditing ? "disabled" : ""}`}
                  />
                </div>
                <div className="input-field">
                  <label className="custom-label" htmlFor="email">
                    الحساب
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email}
                    readOnly
                    disabled
                    className="disabled"
                  />
                </div>
                {isEditing && (
                  <div className="input-field">
                    <label className="custom-label" htmlFor="password">
                      رقم السر
                    </label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      readOnly={!isEditing}
                      value={dataForm.password}
                      onChange={changeHandler}
                      className={`${!isEditing ? "disabled" : ""}`}
                    />
                  </div>
                )}
                {!isEditing && isOpen && (
                  <Alert message="لا يمكن التغير" type="error" />
                )}
                {isEditing && error != null && (
                  <Alert message={error} type="error" dir="ltr" />
                )}

                {successMessage && (
                  <Alert message={successMessage} type="success" dir="ltr" />
                )}
                <Button
                  value={!isEditing ? "تعديل المعلومات" : "الغاء التعديل"}
                  onClick={(ev) => {
                    ev.preventDefault();
                    setEditing((prev) => !prev);
                  }}
                />
                {isEditing && (
                  <Button
                    value="تعديل"
                    className="main-bg-color send-button"
                    onClick={updateHandler}
                  />
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// TODO : in next release we should to handle error messages globally
