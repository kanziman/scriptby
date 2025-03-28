import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { useQuery } from "../../context/QueryContext";
import Empty from "../../ui/Empty";
import MainHeading from "../../ui/MainHeading";
import { useScriptOne } from "../scripts/useScriptOne";
import EditScriptForm from "./EditScriptForm";

function EditScript() {
  const { selectedShow } = useQuery();
  const { id: showId } = selectedShow;

  const { action } = useParams();
  const isEdit = action === "edit";

  const { scriptId } = useParams();
  const {
    translatedLanguage,
    fileName,
    show,
    episodeName,
    episodeNumber,
    seasonNumber,
  } = useScriptOne({
    scriptId,
  });

  const episode = { episodeName, episodeNumber, seasonNumber };

  if (!show) return <Empty resourceName="no show" />;

  console.log("fileName :>> ", fileName);
  return (
    <>
      <MainHeading
        headName={<FormattedMessage id="script.addHeader" />}
        right="moveBack"
      />
      <EditScriptForm
        isEdit
        scriptId={scriptId}
        show={show}
        translatedLanguage={translatedLanguage}
        uploadFileName={fileName}
        episode={episode}
      />
    </>
  );
}

export default EditScript;
