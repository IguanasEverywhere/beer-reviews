import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";


function Login() {

  const formSchema = yup.object().shape({
    username: yup.string().required("Must provide username"),
    password: yup.string().required("Must enter password")
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      }).then((r) => {
        console.log(r)
      })
    }
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
        placeholder="Username"
        id="username"
        name="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        ></input>
        <input
        placeholder="password"
        id="password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        ></input>

        <button type="submit">Login!</button>

      </form>
    </div>
  )
}

export default Login;