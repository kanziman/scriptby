import { useReducer, useState } from "react";
import { HiArrowLeft } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Row from "../../ui/Row";
import { initState, reducer } from "./reducer";
import Search from "./Search";
import useFetch from "./useFetch";

import ScriptTableOperations from "../../features/scripts/ScriptTableOperations";
import Box from "../../ui/Box";
import Spinner from "../../ui/Spinner";
import Description, { DescriptionInfo, DescriptionText } from "./Description";
import Detail from "./Detail";
import Episodes from "./Episodes";
import { SeasonList } from "./SeasonList";
import ShowDetail from "./ShowDetail";
import Shows from "./Shows";

function UploadForm() {
  const [query, setQuery] = useState("");
  const [state, dispatch] = useReducer(reducer, initState);
  console.log("new state:", state);

  const { isShowsLoading, isSeasonsLoading, isEpisodesLoading, error } =
    useFetch(state, dispatch, query);

  if (error) return <ErrorMessage />;

  return (
    <>
      <Row type="horizontal">
        <Search query={query} setQuery={setQuery} />
        <ScriptTableOperations />
      </Row>
      <Row type="vertical-gap">
        {isShowsLoading && <Spinner />}
        {!isShowsLoading && !state.selectedShow && (
          <Shows dispatch={dispatch} selectedShow={null} shows={state.shows} />
        )}
        {isSeasonsLoading && <Spinner />}
        {!isSeasonsLoading && state.selectedShow && (
          <Box>
            <ShowDetail>
              <Detail selectedShow={state.selectedShow} dispatch={dispatch} />
              <Description>
                <DescriptionText selectedShow={state.selectedShow} />
                <DescriptionInfo selectedShow={state.selectedShow} />
              </Description>
            </ShowDetail>
            <SeasonList
              selectedShow={state.selectedShow}
              seasons={state.selectedShow?.seasons}
              seasonNumber={state.seasonNumber}
              state={state}
              dispatch={dispatch}
            />
          </Box>
        )}
        {isEpisodesLoading && <Spinner />}
        {!isEpisodesLoading && state.episodes?.length > 0 && (
          <Episodes
            episodes={state.episodes}
            selectedShow={state.selectedShow}
          />
        )}
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
