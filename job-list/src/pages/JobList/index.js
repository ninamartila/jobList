import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import moment from "moment";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Skeleton } from "antd";
import Header from "../../component/Header";
import Search from "../../component/Search";

function JobList(props) {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [filters, setFilters] = useState({
    desc: "",
    loc: "",
    isFullTime: false,
  });
  const [loading, setLoading] = useState(false);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    getData(true);
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const getData = (isLoadMore = false) => {
    const nextPage = page + 1;
    setLoading(true);
    axios
      .get(
        `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?page=${
          isLoadMore ? nextPage : 1
        }&description=${filters.desc}&location=${filters.loc}${
          filters.isFullTime ? `&full_time=true` : ""
        }`
      )
      .then(function (response) {
        setLoading(false);
        if (isLoadMore) {
          const newList = response.data.filter((item) => item !== null);
          setList([...list, ...newList]);
          setPage(nextPage);
          if (newList.length < 10) {
            setLoadMore(false);
          } else {
            setLoadMore(true);
          }
        } else {
          setList(response.data.filter((item) => item !== null));
          setPage(1);
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const createdDate = (created_at) => {
    const diffInDate = moment().diff(created_at, "days");

    return diffInDate === 0 ? "today" : `${diffInDate} days ago`;
  };

  return (
    <div className="App">
      <Header />
      <body className="App-body">
        <Search setFilters={(filter) => setFilters(filter)} />
        <div className="App-job-list">
          <h1>Job List</h1>
          <InfiniteScroll
            dataLength={list.length}
            next={loadMoreData}
            hasMore={loadMore}
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            {list?.map((item) => (
              <Link to={`/${item?.id}`}>
                <div className="App-list">
                  <div className="App-list-item-row">
                    <div className="list-label">{item?.title}</div>
                    <div className="list-place">{item?.location}</div>
                  </div>
                  <div className="App-list-item-row">
                    <div className="App-list-item">
                      <div className="list-description">{item?.company} -</div>{" "}
                      <div className="list-type">{item?.type}</div>
                    </div>
                    <div className="list-description">
                      {createdDate(item?.created_at)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </InfiniteScroll>
        </div>
      </body>
    </div>
  );
}

export default JobList;
