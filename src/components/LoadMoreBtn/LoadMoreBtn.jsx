import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={css.btnLoadMore} type="button" onClick={onClick}>
      LoadMoreBtn
    </button>
  );
};

export default LoadMoreBtn;
