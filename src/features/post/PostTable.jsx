import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";

import { FormattedMessage } from "react-intl";
import Spinner from "../../ui/Spinner";
import ScreenPagenation from "../scripts/ScreenPagenation";
import PostRow from "./PostRow";
import PostRowNotice from "./PostRowNotice";
import { usePosts } from "./usePosts";

function PostTable({ isToggled }) {
  const { posts, count, isPending } = usePosts();

  if (isPending) return <Spinner />;
  if (!posts) {
    return <Empty resourceName={<FormattedMessage id="empty.noPosts" />} />;
  }
  const { noticePosts, generalPosts } = posts;
  return (
    <Menus>
      <Table columns={"1fr 3rem"} minWidth={"300"}>
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
