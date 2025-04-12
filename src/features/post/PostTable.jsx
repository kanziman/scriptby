import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import { useIntl } from "react-intl";
import Spinner from "../../ui/Spinner";
import ScreenPagenation from "../scripts/ScreenPagenation";
import PostRow from "./PostRow";
import PostRowNotice from "./PostRowNotice";
import { usePosts } from "./usePosts";

function PostTable({ isToggled }) {
  const intl = useIntl();
  const { posts, count, isPending } = usePosts();
  const resourceName = intl.formatMessage({ id: "menu.posts" });

  if (isPending) return <Spinner />;

  const { noticePosts, generalPosts } = posts;
  if (!noticePosts.length > 0 && !generalPosts.length > 0) {
    return <Empty resource={resourceName} />;
  }
  return (
    <Menus>
      <Table columns={"1fr 2.4rem"} minWidth={"300"}>
        {/* <Table.Header>
          <div></div>
          <div></div>
          <div></div>
        </Table.Header> */}

        {noticePosts.length > 0 && (
          <Table.Body
            data={noticePosts}
            render={(item, index) => (
              <PostRowNotice key={`notice-${index}`} data={item} />
            )}
          />
        )}
        {generalPosts.length > 0 && (
          <Table.Body
            data={generalPosts}
            render={(item, index) => (
              <PostRow key={`general-${index}`} data={item} />
            )}
          />
        )}

        <Table.Footer>
          <ScreenPagenation count={count} isToggled={isToggled} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PostTable;
