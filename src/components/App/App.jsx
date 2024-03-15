import { useEffect, useState } from "react";
import ApiService from "../ApiService/ApiService";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [photo, setPhoto] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [loaderVissible, setLoaderVissible] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({
    src: "",
    desription: "",
  });
  useEffect(() => {
    if (query === "") {
      return;
    }
    async function fetchData() {
      try {
        setLoaderVissible(true);
        const { results, total_pages } = await ApiService(query, page);

        if (results.length === 0) {
          return toast.error("This didn't work.");
        }

        setPhoto(results);
        setBtnLoadMore(total_pages > page);
        setPhoto((prevPhoto) => {
          return [...prevPhoto, ...results];
        });
      } catch (error) {
        setError(true);
        toast.error("This didn't work.");
      } finally {
        setLoaderVissible(false);
      }
    }
    fetchData();
  }, [query, page]);

  const searchPhoto = (value) => {
    setQuery(value);
    setBtnLoadMore(false);
    setPage(1);
    setPhoto([]);
    setError(false);
  };
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  function handleModal(state, photo) {
    setModalIsOpen(state);
    if (state) setSelectedPhoto(photo);
  }
  return (
    <>
      <Toaster position="top-center" />

      <SearchBar onSearch={searchPhoto} />
      {error && <ErrorMessage />}
      {loaderVissible && <Loader />}
      {photo.length > 0 && (
        <ImageGallery items={photo} onSelect={handleModal} />
      )}
      {btnLoadMore && <LoadMoreBtn onClick={loadMore} />}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={handleModal}
        photo={selectedPhoto}
      />
    </>
  );
}

export default App;
