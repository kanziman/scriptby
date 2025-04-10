import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import MainHeading from "../../ui/MainHeading";
import { useScriptOne } from "../scripts/useScriptOne";
import EditScriptForm from "./EditScriptForm";

function EditScript() {
  const { scriptId } = useParams();
  const {
    translatedLanguage,
    fileName,
    show,
    episodeName,
    episodeNumber,
    seasonNumber,
    profile,
  } = useScriptOne({
    scriptId,
  });

  const episode = { episodeName, episodeNumber, seasonNumber };

  const intl = useIntl();
  const resourceName = intl.formatMessage({ id: "menu.show" });

  if (!show) {
    return <Empty resource={resourceName} />;
  }

  return (
    <>
      <MainHeading right="moveBack">
        <Heading as="h1">
          {<FormattedMessage id="scriptAdd.editHeader" />}
        </Heading>
      </MainHeading>

      {/* EDIT */}
      <EditScriptForm
        isEdit
        scriptId={scriptId}
        show={show}
        profile={profile}
        translatedLanguage={translatedLanguage}
        uploadFileName={fileName}
        episode={episode}
      />
    </>
  );
}

export default EditScript;
