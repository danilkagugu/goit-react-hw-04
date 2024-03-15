import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values) => {
    onSearch(values.query);
    if (!values.query) {
      return toast.error("Write anything😉");
    }
  };
  return (
    <header className={css.header}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="query"
            placeholder="Search images and photos"
          ></Field>
          <button className={css.btnSearch} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
