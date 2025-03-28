import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import AddScript from "../../features/scripts/AddScript";
import ScriptsTable from "../../features/scripts/ScriptTable";
import ScriptTableOperations from "../../features/scripts/ScriptTableOperations";
import Search from "../../features/upload/Search";
import { useQuery } from "../../features/upload/useQuery";
import Box from "../../ui/Box";
import ButtonIcon from "../../ui/ButtonIcon";
import Row from "../../ui/Row";
import Description, { DescriptionInfo, DescriptionText } from "./Description";
import DetailsOverView from "./Detail";
import Episodes from "./Episodes";
import { SearchedList } from "./SearchedList";
import { SeasonList } from "./SeasonList";
const initialState = {
  id: null,
  seasonNumber: null,
  isSeason: false,
  url: "",
};

function UploadForm() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(initialState);

  const {
    searchedResults,
    showDetail,
    setShowDetail,
    episodes,
    setEpisodes,
    isLoading,
    error,
  } = useQuery(query, show);

  function handleSelectShow(show) {
    // setQuery("");
    setEpisodes([]);
    setShow((prev) => {
      const isSeasonSelected =
        show.seasonNumber !== undefined && show.seasonNumber !== null;

      return {
        id: isSeasonSelected ? prev.id : show.id,
        seasonNumber: isSeasonSelected ? show.seasonNumber : prev.seasonNumber,
        isSeason: isSeasonSelected,
      };
    });
  }

  function handleCloseShow() {
    setShow(initialState);
    setShowDetail(null);
  }

  // if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage onCloseShow={handleCloseShow} />;

  return (
    <>
      <Row type="horizontal">
        <Search query={query} setQuery={setQuery} />
        <ScriptTableOperations />
      </Row>
      <Row type="vertical-double">
        {!showDetail && (
          <SearchedList
            show={show}
            searchedResults={searchedResults}
            onSelectShow={handleSelectShow}
          />
        )}
        {showDetail && (
          <Box>
            <DetailsOverView
              showDetail={showDetail}
              onCloseShow={handleCloseShow}
            />
            <Description>
              <DescriptionText showDetail={showDetail} />
              <DescriptionInfo showDetail={showDetail} />
            </Description>
            <SeasonList
              show={show}
              seasons={showDetail.seasons}
              onSelectShow={handleSelectShow}
            />
          </Box>
        )}
        {episodes.length > 0 && (
          <Box>
            <Episodes episodes={episodes} onSelectShow={handleSelectShow} />
          </Box>
        )}
      </Row>
      <Row>
        <ScriptsTable />
        <AddScript />
      </Row>
    </>
  );
}

function ErrorMessage({ message, onCloseShow }) {
  return (
    <>
      <p className="error">
        <span>⛔️</span> {message}
      </p>
      <ButtonIcon onClick={onCloseShow}>
        <HiArrowLeft />
      </ButtonIcon>
    </>
  );
}

export default UploadForm;
